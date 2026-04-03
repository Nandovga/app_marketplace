import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserStore } from "../../shared/store/user-store";
import { RegisterFormData, registerScheme } from "./register.scheme";
import { userRegisterMutation } from "../../shared/queries/auth/user-resgister.mutation";

export const useRegisterViewModel = () => {
    const useRegisterMutation = userRegisterMutation();
    const { setSession, user } = useUserStore()

    const { control, handleSubmit, formState: { errors }} = useForm<RegisterFormData>({
        resolver: yupResolver(registerScheme),
        defaultValues: {
            name: "Luiz Fernando",
            email: "nandovga123@gmail.com",
            phone: "11111111111",
            password: "123123123",
            confirmPassword: "123123123"
        }
    });
    const onSubmit = handleSubmit(async (userData) => {
        const { confirmPassword, ...registerData } = userData;
        const mutationResponse = await useRegisterMutation.mutateAsync(registerData);

        setSession({
            user: mutationResponse.user,
            token: mutationResponse.token,
            refreshToken: mutationResponse.refreshToken
        })
    });

    return {control, onSubmit, errors}
};