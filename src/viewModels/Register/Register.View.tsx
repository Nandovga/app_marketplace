import { FC } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "../../shared/components/AppButton";
import { useRegisterViewModel } from "./useRegister.viewModel";
import { AuthFormHeader } from "../../shared/components/AuthFormHeader";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardContainer } from "../../shared/components/KeyboardContainer";
import { AppInputController } from "../../shared/components/AppInputController";

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({
  control,
  onSubmit,
  handleSelectAvatar,
  avatarUri,
}) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <AuthFormHeader
          title="Crie sua conta"
          subtitle="Informe os seus dados pessoais e de acesso"
        />
        <TouchableOpacity
          className="w-[120px] h-[120px] rounded-[12px] items-center justify-center bg-shape self-center mb-8"
          onPress={handleSelectAvatar}
        >
          {avatarUri ? (
            <Image
              className="w-full h-full rounded-[12px]"
              resizeMode="cover"
              source={{ uri: avatarUri }}
            />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} />
          )}
        </TouchableOpacity>
        <AppInputController
          label="NOME"
          leftIcon="person-outline"
          control={control}
          placeholder="Seu nome completo"
          name="name"
        />
        <AppInputController
          label="TELEFONE"
          leftIcon="call-outline"
          control={control}
          placeholder="(00) 00000-0000"
          name="phone"
        />
        <Text className="text-base mt-6 font-bold text-gray-500">Acesso</Text>
        <AppInputController
          label="E-MAIL"
          leftIcon="mail-outline"
          placeholder="mail@example.com.br"
          control={control}
          name="email"
        />
        <AppInputController
          label="SENHA"
          secureTextEntry
          leftIcon="lock-closed-outline"
          control={control}
          placeholder="Sua senha"
          name="password"
        />
        <AppInputController
          secureTextEntry
          label="CONFIRMA SENHA"
          leftIcon="lock-closed-outline"
          control={control}
          placeholder="Confirme sua senha"
          name="confirmPassword"
        />
        <AppButton
          className="mt-6"
          rightIcon="arrow-forward"
          onPress={onSubmit}
        >
          Cadastrar
        </AppButton>
        <View className="mt-16">
          <Text className="text-base mb-4 text-gray-300">
            Já tem uma conta?
          </Text>
          <AppButton
            variant="outlined"
            rightIcon="arrow-forward"
            onPress={() => router.push("/(public)/login")}
          >
            Acessar
          </AppButton>
        </View>
      </ScrollView>
    </KeyboardContainer>
  );
};
