import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateIncomePayload {
  income_category: string;
  income_amount: number;
  date: Date;
  payment_mode: string;
  notes?: string;
}

export const incomeApi = {
  createIncome: (body: CreateIncomePayload) =>
    handleRequest(apiClient.post("/income/create", body)),
};
