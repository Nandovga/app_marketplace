import { AppInput, AppInputProps } from "../AppInput";
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";

interface AppInputControllerProps<T extends FieldValues> extends Omit<AppInputProps, "value" | "onChangeText" | "error"> {
    control: Control<T>;
    name: Path<T>;
    errors?: FieldErrors<T>
}

export const AppInputController = <T extends FieldValues>({
    control, name, errors, ...rest
}: AppInputControllerProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                 field: { onChange, onBlur, value },
                 fieldState: { error },
                 formState: { isSubmitting }
            }) => (
                <AppInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    error={error?.message}
                    isDisabled={isSubmitting || rest.isDisabled}
                    {...rest}/>
            )}/>
    );
};