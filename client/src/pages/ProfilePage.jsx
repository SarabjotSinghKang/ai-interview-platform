import {
  AlertCircle,
  CheckCircle2,
  LockKeyhole,
  Mail,
  Save,
  UserRound,
} from "lucide-react";

import { useState } from "react";

import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Avatar from "../components/ui/Avatar.jsx";

import { useAuth } from "../context/AuthContext.jsx";

import {
  updateProfile,
  changePassword,
} from "../services/authService.js";


function ProfilePage() {
  const {
    user,
    updateUser,
  } = useAuth();


  // -----------------------------
  // Profile form
  // -----------------------------

  const [name, setName] =
    useState(user?.name || "");

  const [email, setEmail] =
    useState(user?.email || "");

  const [profilePicture, setProfilePicture] =
    useState(
      user?.profilePicture || ""
    );

  const [isSavingProfile, setIsSavingProfile] =
    useState(false);

  const [profileMessage, setProfileMessage] =
    useState("");

  const [profileError, setProfileError] =
    useState("");


  // -----------------------------
  // Password form
  // -----------------------------

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [isChangingPassword, setIsChangingPassword] =
    useState(false);

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");


  // -----------------------------
  // Update profile
  // -----------------------------

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    setProfileMessage("");
    setProfileError("");

    if (!name.trim()) {
      setProfileError("Name is required.");
      return;
    }

    if (!email.trim()) {
      setProfileError("Email is required.");
      return;
    }

    try {
      setIsSavingProfile(true);

      const data = await updateProfile({
        name: name.trim(),
        email: email.trim(),
        profilePicture: profilePicture.trim(),
      });

      updateUser(data.user);

      setName(data.user.name);
      setEmail(data.user.email);
      setProfilePicture(
        data.user.profilePicture || ""
      );

      setProfileMessage(
        "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "Update profile error:",
        error
      );

      setProfileError(
        error.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setIsSavingProfile(false);
    }
  };


  // -----------------------------
  // Change password
  // -----------------------------

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setPasswordError(
        "Please fill in all password fields."
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters long."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New password and confirmation do not match."
      );
      return;
    }

    try {
      setIsChangingPassword(true);

      const data = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setPasswordMessage(
        data.message ||
          "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      setPasswordError(
        error.response?.data?.message ||
          "Unable to change your password."
      );
    } finally {
      setIsChangingPassword(false);
    }
  };


  return (
    <div className="space-y-8">

      {/* Page header */}

      <section>
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
          <UserRound className="size-3.5" />
          Account settings
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Your profile
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
          Manage your account information and
          security settings.
        </p>
      </section>


      {/* Profile information */}

      <Card>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          <Avatar
            name={user?.name || "User"}
            imageUrl={
              profilePicture || ""
            }
            size="lg"
          />

          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Profile information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the information associated
              with your account.
            </p>
          </div>

        </div>


        <form
          onSubmit={handleProfileSubmit}
          className="mt-8 space-y-6"
        >

          {/* Name */}

          <div>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Full name
            </label>

            <div className="relative">

              <UserRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-400/10"
              />

            </div>
          </div>


          {/* Email */}

          <div>
            <label
              htmlFor="profile-email"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Email address
            </label>

            <div className="relative">

              <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-400/10"
              />

            </div>
          </div>


          {/* Profile picture */}

          <div>
            <label
              htmlFor="profile-picture"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Profile picture URL
            </label>

            <input
              id="profile-picture"
              type="url"
              value={profilePicture}
              onChange={(event) =>
                setProfilePicture(
                  event.target.value
                )
              }
              placeholder="https://example.com/photo.jpg"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-400/10"
            />

            <p className="mt-2 text-xs text-slate-400">
              Enter a public image URL if you
              want to use a profile picture.
            </p>
          </div>


          {/* Profile error */}

          {profileError && (
            <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">

              <AlertCircle className="mt-0.5 size-4 shrink-0" />

              {profileError}

            </div>
          )}


          {/* Profile success */}

          {profileMessage && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">

              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />

              {profileMessage}

            </div>
          )}


          <div className="flex justify-end">

            <Button
              type="submit"
              isLoading={isSavingProfile}
            >
              <Save className="size-4" />
              Save profile
            </Button>

          </div>

        </form>

      </Card>


      {/* Security */}

      <Card>

        <div className="flex items-center gap-4">

          <span className="grid size-12 place-items-center rounded-2xl bg-brand-50">

            <LockKeyhole className="size-5 text-brand-600" />

          </span>

          <div>

            <h2 className="text-xl font-bold text-slate-950">
              Change password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep your account secure with a
              strong password.
            </p>

          </div>

        </div>


        <form
          onSubmit={handlePasswordSubmit}
          className="mt-8 space-y-6"
        >

          {/* Current password */}

          <div>

            <label
              htmlFor="current-password"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Current password
            </label>

            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-400/10"
            />

          </div>


          {/* New password */}

          <div>

            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              New password
            </label>

            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-400/10"
            />

          </div>


          {/* Confirm password */}

          <div>

            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Confirm new password
            </label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-400/10"
            />

          </div>


          {/* Password error */}

          {passwordError && (
            <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">

              <AlertCircle className="mt-0.5 size-4 shrink-0" />

              {passwordError}

            </div>
          )}


          {/* Password success */}

          {passwordMessage && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">

              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />

              {passwordMessage}

            </div>
          )}


          <div className="flex justify-end">

            <Button
              type="submit"
              isLoading={isChangingPassword}
            >
              <LockKeyhole className="size-4" />

              Change password
            </Button>

          </div>

        </form>

      </Card>

    </div>
  );
}


export default ProfilePage;