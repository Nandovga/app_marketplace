import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/user-store";
import * as authService from "../../services/auths.service";
import { LoginHttpParams } from "../../interfaces/http/login";

export const userLoginMutation = () => {
    const { setSession } = useUserStore()

    return useMutation({
        mutationFn: (userData: LoginHttpParams) => authService.login(userData),
        onSuccess: (response) => {
            setSession(response)
        },
        onError: (error) => {
            console.log(error)
        },
    });
}