import api from "./api.js";


// Get current logged-in user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};


// Update profile
export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/auth/profile",
    profileData
  );

  return response.data;
};


// Change password
export const changePassword = async (passwordData) => {
  const response = await api.put(
    "/auth/change-password",
    passwordData
  );

  return response.data;
};