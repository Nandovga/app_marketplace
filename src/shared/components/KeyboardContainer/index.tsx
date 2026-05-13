import { FC, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View } from "react-native";

export interface KeyboardContainerProps {
    children: ReactNode
}

export const KeyboardContainer: FC<KeyboardContainerProps> = ({ children }) => {
    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1">
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}