import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateUserPayload {
  username: string;
  lastName: string;
  emailId: string;
  password: string;
  mobileNumber: string;
}

export const UserApi = {
  createUser: (body: CreateUserPayload) =>
    handleRequest(apiClient.post("user/create", body)),
};
