import { useMutation } from "@tanstack/react-query";
import type { CreateUserPayload } from "./userApi";
import { toast } from "react-toastify";
import { UserApi } from "./userApi";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (body: CreateUserPayload) => UserApi.createUser(body),

    onSuccess: (data) => {
      toast.success(`User created successfully ${data?.message}`);
    },

    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
