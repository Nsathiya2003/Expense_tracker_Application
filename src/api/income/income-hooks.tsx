import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { incomeApi, type CreateIncomePayload } from "./incomeApi";
import { toast } from "react-toastify";

export const useCreateIncome = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateIncomePayload) => incomeApi.createIncome(body),

    onSuccess: (data) => {
      toast.success(`${data?.message}` || "your income was added");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["income"] });
      }, 3000);
      resetForm();
    },

    onError: (error) => {
      toast.error(
        `${error?.message}` || "something went wrong add your income"
      );
    },
  });
};

export const useGetIncome = () => {
  return useQuery({
    queryKey: ["income"],
    queryFn: () => incomeApi.getIncome(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
