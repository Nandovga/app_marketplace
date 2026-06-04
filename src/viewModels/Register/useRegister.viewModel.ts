import { useState} from "react";
import { useForm } from "react-hook-form";
import { CameraType } from "expo-image-picker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useImage } from "../../shared/hooks/useImage";
import { useUserStore } from "../../shared/store/user-store";
import { RegisterFormData, registerScheme } from "./register.scheme";
import { userRegisterMutation } from "../../shared/queries/auth/user-resgister.mutation";
import { userUploadAvatarMutation } from "../../shared/queries/auth/user-upload-avatar.mutation";

export const useRegisterViewModel = () => {
    const { setSession, updateUser } = useUserStore();
    const [avatarUri, setAvatarUri] = useState<string | null>(null)

    const { handleSelectImage } = useImage({
        callback: setAvatarUri,
        cameraType: CameraType.front
    })

    const handleSelectAvatar = async () => {
        await handleSelectImage();
    }

    const { control, handleSubmit, formState: { errors }} = useForm<RegisterFormData>({
        resolver: yupResolver(registerScheme),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        }
    });

    const useAvatarUploadMutation = userUploadAvatarMutation();
    const useRegisterMutation = userRegisterMutation({
        onSuccess: async () => {
            if (avatarUri) {
                const { url } = await useAvatarUploadMutation.mutateAsync(avatarUri)
                console.log(url);
                updateUser({ avatarUrl: url })
            }
        }
    });
    const onSubmit = handleSubmit(async (userData) => {
        const { confirmPassword, ...registerData } = userData;
        await useRegisterMutation.mutateAsync(registerData);
    });

    return { control, onSubmit, errors, handleSelectAvatar, avatarUri }
};