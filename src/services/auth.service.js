import { axiosInstance } from "./axios.js";

export const signup = async ({ name, email, password }) => {
  try {
    const res = await axiosInstance.post("/users/register", { name, email, password });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to register user");
  }
};

export const verifyEmail = async (token) => {
  try {
    const res = await axiosInstance.get(`/users/verify/${token}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to verify email");
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post("/users/login", { email, password });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to login user");
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.get("/users/logout");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to logout user");
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/users/me");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to fetch current user");
  }
};

export const resendVerificationEmail = async ({ email }) => {
  try {
    const res = await axiosInstance.post("/users/resend-verification", { email });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to resend verification email");
  }
};

export const updatePassword = async ({ currentPassword, newPassword }) => {
  try {
    const res = await axiosInstance.patch("/users/update-password", {
      currentPassword,
      newPassword,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to update password");
  }
};

export const resetPasswordRequest = async ({ email }) => {
  try {
    const res = await axiosInstance.post("/users/reset-password-request", { email });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to request password reset");
  }
};

export const resetPassword = async ({ token, password }) => {
  try {
    const res = await axiosInstance.patch(`/users/reset-password/${token}`, { password });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to reset password");
  }
};
