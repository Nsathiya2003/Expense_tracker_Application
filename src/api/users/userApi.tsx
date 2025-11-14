import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateUserPayload {
  username: string;
  lastName: string;
  emailId: string;
  password: string;
  mobileNumber: string;
}

export interface LoginUserPayload {
  emailId: string;
  password: string;
}

export interface ForgotUserPayload {
  emailId: string;
}

export interface ResetPasswordPayload {
  emailId: string;
  password: string;
  otp: string;
}

export interface UpdateUserPayload {
  user_profile: File;
  username: string;
  lastName: string;
  emailId: string;
  mobileNumber: string;
  age?: number;
  gender?: string;
  address?: string;
}

//get userId...
const userId = localStorage.getItem("user_id");

export const UserApi = {
  createUser: (body: CreateUserPayload) =>
    handleRequest(apiClient.post("user/create", body)),
  loginUser: (body: LoginUserPayload) =>
    handleRequest(apiClient.post("/user/login", body)),
  forgotPassword: (body: ForgotUserPayload) =>
    handleRequest(apiClient.post("/user/forgot-password", body)),
  resetPassword: (body: ResetPasswordPayload) =>
    handleRequest(apiClient.post("/user/reset-password", body)),
  updateUser: (body: FormData) =>
    handleRequest(apiClient.put(`/user/update/${userId}`, body)),
  getUser: () => handleRequest(apiClient.get(`/user/get/${userId}`)),
};
