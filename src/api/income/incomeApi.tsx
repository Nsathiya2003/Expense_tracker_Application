import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateIncomePayload {
  income_category: string;
  income_amount: number;
  income_date: Date;
  payment_receive_mode: string;
  notes: string;
  saving_contribution: boolean;
  goal_id: string;
  goal_contribute_amount: number;
}

export const incomeApi = {
  createIncome: (body: CreateIncomePayload) =>
    handleRequest(apiClient.post("/income/create", body)),
};
