import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api.js";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] =
    useState(true);


  useEffect(() => {
    const loadCurrentUser = async () => {
      const token =
        localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response =
          await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        console.error(
          "Unable to restore user session:",
          error
        );

        localStorage.removeItem("token");

        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };


    loadCurrentUser();
  }, []);


  const register = async (formData) => {
    const response =
      await api.post(
        "/auth/register",
        formData
      );

    localStorage.setItem(
      "token",
      response.data.token
    );

    setUser(response.data.user);

    return response.data;
  };


  const login = async (formData) => {
    const response =
      await api.post(
        "/auth/login",
        formData
      );

    localStorage.setItem(
      "token",
      response.data.token
    );

    setUser(response.data.user);

    return response.data;
  };


  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };


  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };


  const value = {
    user,

    isAuthenticated:
      Boolean(user),

    isLoading,

    register,

    login,

    logout,

    updateUser,
  };


  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}