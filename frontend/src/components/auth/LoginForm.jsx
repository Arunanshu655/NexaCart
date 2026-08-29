import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, LockKeyhole, ShoppingBag } from "lucide-react";

import { LOGIN_USER } from "../../graphql/mutations/authMutations";
import { useAuth } from "../../context/AuthContext";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { loading, error }] =
    useMutation(LOGIN_USER);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: formData,
      });

      login(data.login);

      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card
      hover={false}
      className="w-full max-w-md p-7 sm:p-9"
    >
      {/* Logo */}
      <div className="flex justify-center">
        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-full
            bg-[var(--primary)]
            text-white
          "
        >
          <ShoppingBag size={22} />
        </div>
      </div>

      {/* Heading */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold">
          Welcome back
        </h2>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Sign in to continue to NexaCart
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <div className="relative">
          <Mail
            size={17}
            className="
              absolute
              left-4
              top-[42px]
              z-10
              text-[var(--muted)]
            "
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="pl-11"
            required
          />
        </div>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="
              absolute
              left-4
              top-[42px]
              z-10
              text-[var(--muted)]
            "
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="pl-11"
            required
          />
        </div>

        {error && (
          <div className="
            rounded-[10px]
            bg-red-50
            px-4 py-3
            text-sm
            text-[var(--danger)]
          ">
            {error.message}
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Login
        </Button>
      </form>

      {/* Register */}
      <p className="mt-7 text-center text-sm text-[var(--muted)]">
        Don't have an account?{" "}

        <Link
          to="/register"
          className="
            font-medium
            text-[var(--primary)]
            hover:underline
          "
        >
          Create one
        </Link>
      </p>
    </Card>
  );
};

export default LoginForm;