import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  LockKeyhole,
  ShoppingBag,
} from "lucide-react";

import { REGISTER_USER } from "../../graphql/mutations/authMutations";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [registerUser, { loading, error }] =
    useMutation(REGISTER_USER);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        variables: formData,
      });

      alert("Registration Successful!");

      console.log(data.register);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "buyer",
      });

    } catch (err) {
      console.log(err);
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
          Create your account
        </h2>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Join {import.meta.env.VITE_BRAND_NAME} today
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Name */}
        <div className="relative">
          <User
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
            label="Name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="pl-11"
            required
          />
        </div>

        {/* Email */}
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

        {/* Password */}
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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="pl-11"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="text-sm font-medium">
            Account Type
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="
              mt-2
              w-full
              rounded-[10px]
              border border-[var(--border)]
              bg-white
              px-4 py-3
              text-sm
              outline-none
              transition-all duration-200
              focus:border-[var(--primary)]
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <option value="buyer">
              Buyer
            </option>

            <option value="seller">
              Seller
            </option>
          </select>
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
          Create Account
        </Button>
      </form>

      {/* Login */}
      <p className="mt-7 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}

        <Link
          to="/login"
          className="
            font-medium
            text-[var(--primary)]
            hover:underline
          "
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
};

export default RegisterForm;