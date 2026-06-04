import { Toast } from "toastify-react-native";
import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "../../services/auths.service";

export const userUploadAvatarMutation = () => {
    return useMutation({
        mutationFn: uploadAvatar,
        onSuccess: (response) => {
            console.log(response)
        },
        onError: () => {
            Toast.error("Erro ao fazer upload da foto de perfil.")
        },
    });
}