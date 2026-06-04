import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/user-store";
import * as authService from "../../services/auths.service";
import { RegisterHttpParams } from "../../interfaces/http/register";

interface UserResgisterMutationParams {
    onSuccess?: () => void
}

export const userRegisterMutation = ({ onSuccess }: UserResgisterMutationParams = {}) => {
    const { setSession } = useUserStore();

    return useMutation({
        mutationFn: (userData: RegisterHttpParams) => authService.register(userData),
        onSuccess: (response) => {
            setSession({
                user: response.user,
                token: response.token,
                refreshToken: response.refreshToken
            })
            onSuccess?.();
        },
        onError: (error) => {
            console.log(error)
        },
    });
}