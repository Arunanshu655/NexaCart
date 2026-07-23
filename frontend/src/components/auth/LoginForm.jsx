import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

import { LOGIN_USER } from "../../graphql/mutations/authMutations";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {

  const navigate = useNavigate();
    // Store JWT
    const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {

    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } = await loginUser({
        variables: formData
      });
     login(data.login);
      alert("Login Successful!");

      navigate("/");

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <form onSubmit={handleSubmit}>

      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && (
        <p>{error.message}</p>
      )}

    </form>

  );

};

export default LoginForm;