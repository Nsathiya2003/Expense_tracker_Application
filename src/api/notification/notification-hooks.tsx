import { useMutation, useQuery } from "@tanstack/react-query";
import {
  notificationApi,
  type filterNotificationPayload,
} from "./notificationApi";
import type { NotificationTypeResponse } from "../../types/response-types";

export interface markNotificationAsReadPayload {
  id: string;
  read: boolean;
}

export const useNotificationFilter = (filters: filterNotificationPayload) => {
  return useQuery<NotificationTypeResponse>({
    queryKey: ["notificationFilter", filters],
    queryFn: () => notificationApi.useNotificationFilter(filters),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useMarkNotificationAsRead = () => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await notificationApi.markAsRead({ ids });
    },
  });
};

export const useDeleteNotifications = () => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await notificationApi.deleteNotifications({ ids });
    },
  });
};
