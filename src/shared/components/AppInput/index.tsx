import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAppInputViewModel } from "./useAppInputViewModel";
import { appInputVariants, AppInputVariantsProps } from "./input.variants";
import { Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

export interface AppInputProps extends TextInputProps, AppInputVariantsProps {
    label?: string
    leftIcon?: keyof typeof Ionicons.glyphMap
    rightIcon?: keyof typeof Ionicons.glyphMap
    containerClassName?: string
    error?: string
    mask?: (value: string) => void | string
}

export const AppInput: FC<AppInputProps> = ({
    label,
    leftIcon,
    rightIcon,
    containerClassName,
    value,
    isError,
    secureTextEntry = false,
    onBlur,
    onFocus,
    onChangeText,
    mask,
    error,
    isDisabled,
    ...textInputProps
}) => {
    const {
        getIconColor,
        handleBlur,
        handleFocus,
        handlePasswordToggle,
        handleWrapperPress,
        showPassword,
        handleTextChange,
        isFocused
    } = useAppInputViewModel({
        isError: !!error,
        isDisabled,
        secureTextEntry,
        value,
        mask,
        onFocus,
        onBlur,
        onChangeText
    })
    const styles = appInputVariants({
        isFocused,
        isDisabled,
        isError: !!error
    });

    return <View className={styles.container({ className: containerClassName })}>
        <Text className={styles.label()}>{label}</Text>
        <Pressable className={styles.wrapper()}>
            {leftIcon
                && <Ionicons className="mr-3"
                             size={22}
                             color={getIconColor()}
                             name={leftIcon}/>}
            <TextInput className={styles.input()}
                       value={value}
                       onBlur={handleBlur}
                       onFocus={handleFocus}
                       onChangeText={handleTextChange}
                       secureTextEntry={showPassword}
                       {...textInputProps}/>
            {secureTextEntry && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handlePasswordToggle}>
                    <Ionicons
                        size={22}
                        name={showPassword ? "eye-outline" : "eye-off-outline"}/>
                </TouchableOpacity>
            )}
        </Pressable>
        {error && (
            <Text className={styles.error()}>
                <Ionicons name="alert-circle-outline"/> {error}
            </Text>
        )}
    </View>;
}