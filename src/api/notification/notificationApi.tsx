import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface filterNotificationPayload {
  page: number;
  limit: number;
  read?: boolean;
}

export const notificationApi = {
  useNotificationFilter: (body: filterNotificationPayload) =>
    handleRequest(apiClient.post("/notification/findAll", body)),
};
