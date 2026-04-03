import { useMutation } from "@tanstack/react-query";
import * as authService from "../../services/auths.service";
import { RegisterHttpParams } from "../../interfaces/http/register";

export const userRegisterMutation = () => {
    return useMutation({
        mutationFn: (userData: RegisterHttpParams) => authService.register(userData),
        onSuccess: (response) => {
            console.log(response)
        },
        onError: (error) => {
            console.log(error)
        },
    });
}