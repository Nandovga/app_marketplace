import { FC } from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useLoginViewModel } from "./useLogin.viewModel";
import { AppButton } from "../../shared/components/AppButton";
import { AuthFormHeader } from "../../shared/components/AuthFormHeader";
import { KeyboardContainer } from "../../shared/components/KeyboardContainer";
import { AppInputController } from "../../shared/components/AppInputController";

export const LoginView: FC<ReturnType<typeof useLoginViewModel>> = ({
    control, onSubmit
}) => {
    return (
        <KeyboardContainer>
            <View className="flex-1 items-center justify-center px-[40px]">
                <View className="flex-1 w-full items-center justify-center">
                    <AuthFormHeader title="Acesse sua conta"
                                    subtitle="Informe seu e-mail e senha para entrar" />
                    <AppInputController
                        control={control}
                        name="email"
                        label="E-MAIL"
                        placeholder="mail@example.com.br"
                        leftIcon="mail-outline"/>
                    <AppInputController
                        secureTextEntry
                        control={control}
                        name="password"
                        label="SENHA"
                        placeholder="Sua senha"
                        leftIcon="lock-closed-outline"/>
                    <AppButton rightIcon="arrow-forward"
                               className="mt-6"
                               onPress={onSubmit}>Acessar</AppButton>
                </View>
                <View className="flex-2 pb-16">
                    <Text className="text-base mb-4 text-gray-300">Ainda não tem uma conta?</Text>
                    <AppButton rightIcon="arrow-forward"
                               variant="outlined"
                               onPress={() => router.push("/register")}>Cadastrar</AppButton>
                </View>
            </View>
        </KeyboardContainer>
    )
}