import { useQuery } from "@tanstack/react-query";
import {
  notificationApi,
  type filterNotificationPayload,
} from "./notificationApi";
import type { NotificationTypeResponse } from "../../types/response-types";

export const useNotificationFilter = (filters: filterNotificationPayload) => {
  return useQuery<NotificationTypeResponse>({
    queryKey: ["notificationFilter", filters],
    queryFn: () => notificationApi.useNotificationFilter(filters),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
