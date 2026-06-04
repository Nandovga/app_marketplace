import { useCallback, useState } from "react";
import { Toast } from "toastify-react-native";
import { Alert, Linking } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerOptions } from "expo-image-picker";

export const useGallery = (pickerOptions: ImagePickerOptions) => {
    const [isLoading, setIsLoading] = useState(false);

    const requestGalleryPermission = useCallback(async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const currentStatus = status == "granted";
            if (!currentStatus) {
                Alert.alert(
                    "Permissão negada!",
                    "Precisamos de permissão para acessar suas fotos.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        { text: "Abrir configurações", onPress: () => {
                            Linking.openSettings();
                        }},
                    ]
                )
                Toast.error("Precisamos da permissão para acessar suas fotos.", "top")
            }
            return currentStatus;
        } catch (error) {
            Toast.error("Erro ao solicitar permissão da galeria.", "top")
            return false;
        }
    }, [])

    const openGallery = useCallback(async (): Promise<string | null> => {
        setIsLoading(true);
        try {
            const hasPermission = await requestGalleryPermission();
            if (!hasPermission) {
                return null;
            }
            const result = await ImagePicker.launchImageLibraryAsync(pickerOptions)
            if (!result.canceled && result.assets && result.assets.length > 0) {
                Toast.success("Foto seleciona com sucesso!.", "top")
                return result.assets[0].uri;
            }
            return null;
        } catch (error) {
            Toast.error("Erro ao selecionar foto.", "top")
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [])

    return { openGallery, isLoading };
};