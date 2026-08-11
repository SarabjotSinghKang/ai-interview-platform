import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import AuthLayout from "../components/layout/AuthLayout.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name =
        "Name must contain at least 2 characters";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      nextErrors.password =
        "Password must contain at least 6 characters";
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      nextErrors.confirmPassword =
        "Passwords do not match";
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

      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Start building stronger interview answers and track your progress from day one."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
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
          <UserRound className="pointer-events-none absolute left-4 top-[43px] size-4 text-slate-600" />

          <Input
            id="name"
            name="name"
            type="text"
            label="Full name"
            placeholder="Sarabjot Kang"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
            className="[&_input]:pl-11"
          />
        </div>

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
            placeholder="Create a secure password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText="Use at least 6 characters."
            autoComplete="new-password"
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

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          label="Confirm password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <label className="flex items-start gap-3 text-sm leading-6 text-slate-400">
          <input
            type="checkbox"
            required
            className="mt-1 size-4 shrink-0 rounded border-white/10 bg-slate-950 accent-brand-500"
          />

          <span>
            I agree to the Terms of Service and Privacy
            Policy.
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="w-full"
        >
          {isSubmitting
            ? "Creating account..."
            : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;