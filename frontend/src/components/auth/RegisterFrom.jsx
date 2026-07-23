import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "../../graphql/mutations/authMutations";

const RegisterForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer"
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const { data } = await registerUser({
        variables: formData
      });

      alert("Registration Successful!");

      console.log(data.register);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "buyer"
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

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

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {error && (
        <p>{error.message}</p>
      )}

    </form>

  );

};

export default RegisterForm;