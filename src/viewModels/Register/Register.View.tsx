import { FC } from "react";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { AppButton } from "../../shared/components/AppButton";
import { useRegisterViewModel } from "./useRegister.viewModel";
import { AuthFormHeader } from "../../shared/components/AuthFormHeader";
import { KeyboardContainer } from "../../shared/components/KeyboardContainer";
import { AppInputController } from "../../shared/components/AppInputController";

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({ control, onSubmit }) => {
    return (
        <KeyboardContainer>
            <ScrollView className="flex-1 px-[40px]">
                <AuthFormHeader title="Crie sua conta"
                                subtitle="Informe os seus dados pessoais e de acesso"/>
                <AppInputController
                    label="NOME"
                    leftIcon="person-outline"
                    control={control}
                    placeholder="Seu nome completo"
                    name="name"/>
                <AppInputController
                    label="TELEFONE"
                    leftIcon="call-outline"
                    control={control}
                    placeholder="(00) 00000-0000"
                    name="phone"/>
                <Text className="text-base mt-6 font-bold text-gray-500">Acesso</Text>
                <AppInputController
                    label="E-MAIL"
                    leftIcon="mail-outline"
                    placeholder="mail@example.com.br"
                    control={control}
                    name="email"/>
                <AppInputController
                    label="SENHA"
                    secureTextEntry
                    leftIcon="lock-closed-outline"
                    control={control}
                    placeholder="Sua senha"
                    name="password"/>
                <AppInputController
                    secureTextEntry
                    label="CONFIRMA SENHA"
                    leftIcon="lock-closed-outline"
                    control={control}
                    placeholder="Confirme sua senha"
                    name="confirmPassword"/>
                <AppButton className="mt-6"
                           onPress={onSubmit}>Registrar</AppButton>
                <View className="mt-16">
                    <Text className="text-base mb-4 text-gray-300">Já tem uma conta?</Text>
                    <AppButton variant="outlined"
                               onPress={() => router.push('/login')}>Login</AppButton>
                </View>
            </ScrollView>
        </KeyboardContainer>
    )
}