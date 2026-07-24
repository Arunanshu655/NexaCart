import LoginForm from "../components/auth/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  
  const {isAuthenticated} = useAuth()
  console.log(isAuthenticated)
  if(isAuthenticated){
  return <Navigate to="/" replace />
}
  return (

    <div className="login-page">

      <LoginForm />

    </div>

  );

};

export default Login;