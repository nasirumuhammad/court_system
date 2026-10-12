import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../../validations/auth.schema";

import useAuthStore from "../../store/authStore";

import Input from "../../components/forms/Input";
import PasswordInput from "../../components/forms/PasswordInput";
import FormError from "../../components/forms/FormError";

const Login = () => {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const { login, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setServerError("");

      await login(data);

      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="text-center text-3xl font-bold">
            Login
          </h2>

          <FormError message={serverError} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              register={register}
              error={errors.email}
            />

            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              register={register}
              error={errors.password}
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;