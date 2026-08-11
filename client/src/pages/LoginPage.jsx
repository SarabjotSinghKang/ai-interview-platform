import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setServerError("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setServerError("");

      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue practising and tracking your interview progress."
      footerText="New to InterviewAI?"
      footerLinkText="Create an account"
      footerLinkTo="/register"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
      >
        {serverError && (
          <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-300">
            {serverError}
          </div>
        )}

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-[43px] size-4 text-slate-600" />

          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            className="[&_input]:pl-11"
          />
        </div>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-[43px] size-4 text-slate-600" />

          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            className="[&_input]:pl-11 [&_input]:pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((current) => !current)
            }
            className="absolute right-4 top-[39px] grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-400">
            <input
              type="checkbox"
              className="size-4 rounded border-white/10 bg-slate-950 accent-brand-500"
            />
            Remember me
          </label>

          <button
            type="button"
            className="font-semibold text-brand-300 transition hover:text-brand-200"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="w-full"
        >
          {isSubmitting
            ? "Signing in..."
            : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;