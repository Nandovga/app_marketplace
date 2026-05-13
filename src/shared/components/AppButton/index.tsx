import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";
import { buttonVariants, ButtonVariantsProps } from "./button.variants";
import {ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";

interface AppButtonProps extends TouchableOpacityProps, ButtonVariantsProps {
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    children: string
}

export const AppButton: FC<AppButtonProps> = ({
    leftIcon,
    rightIcon,
    children,
    variant = "field",
    isLoading,
    isDisabled,
    className,
    ...rest
}) => {
    const contentColor = variant == "field" ? colors.white : colors["purple-base"];
    const styles = buttonVariants({
        hasIcon: !!leftIcon || !!rightIcon,
        isDisabled,
        isLoading,
        variant
    });

    const renderContent = () => {
        if (isLoading) {
            return <ActivityIndicator size={"small"}
                                      color={contentColor}/>
        }
        return <>
            {leftIcon && (<Ionicons name={leftIcon}
                                    size={20}
                                    color={contentColor}/>)}
            <Text className={styles.text()}>
                {children}
            </Text>
            {rightIcon && (<Ionicons name={rightIcon}
                                     size={20}
                                     color={contentColor}/>)}
        </>
    }

    return (
        <TouchableOpacity className={styles.base({className})} {...rest}>
            {renderContent()}
        </TouchableOpacity>
    )
}