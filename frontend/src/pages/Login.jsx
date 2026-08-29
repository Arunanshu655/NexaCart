import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="
      flex
      min-h-[calc(100vh-160px)]
      items-center
      justify-center
      py-10
    ">
      <LoginForm />
    </div>
  );
};

export default Login;