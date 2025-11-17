import { useMutation } from "@tanstack/react-query";
import { incomeApi, type CreateIncomePayload } from "./incomeApi";
import { toast } from "react-toastify";

export const useCreateIncome = () => {
  return useMutation({
    mutationFn: (body: CreateIncomePayload) => incomeApi.createIncome(body),

    onSuccess: (data) => {
      toast.success(`${data?.message}` || "your income was added");
    },

    onError: (error) => {
      toast.error(
        `${error?.message}` || "something went wrong add your income"
      );
    },
  });
};
