import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginScheme } from "./login.scheme";
import { userLoginMutation } from "../../shared/queries/auth/user-login.mutation";

export const useLoginViewModel = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = userLoginMutation();
  const onSubmit = handleSubmit(async (userFormData) => {
      const userData =  await loginMutation.mutateAsync(userFormData)
    console.log(userData)
  });

  return { control, onSubmit };
};
