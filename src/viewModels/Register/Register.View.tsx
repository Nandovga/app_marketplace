import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRegisterViewModel } from "./useRegister.viewModel";
import {AppInputController} from "../../shared/components/AppInputController";

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({ control, onSubmit }) => {
    return (
        <View className="flex-1 justify-center">
            <AppInputController
                isDisabled
                label="E-MAIL"
                leftIcon="mail-outline"
                control={control}
                name="email"/>
            <TouchableOpacity onPress={onSubmit}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View>
    )
}