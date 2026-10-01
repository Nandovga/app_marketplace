import { LoginView } from "../../viewModels/Login/Login.View";
import { useLoginViewModel } from "../../viewModels/Login/useLogin.viewModel";

export default function Login() {
  const props = useLoginViewModel();
  return <LoginView {...props} />;
}
