import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateBudgetPayload {
  budget_category: string;
  budget_amount: number;
  budget_month: string;
  budget_start_date: Date;
  notes: string;
  need_Notification: boolean;
  budget_Exceeded: boolean;
  budget_Reaches: boolean;
  reach_percentage: string;
}

export interface filterBudgetPayload {
  page: number;
  limit: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
}

export interface updateBudgetPayload extends CreateBudgetPayload {
  id: string;
}
export const budgetApi = {
  createBudget: (body: CreateBudgetPayload) =>
    handleRequest(apiClient.post("/budget/create", body)),
  getBudgets: () => handleRequest(apiClient.get("/budget/find")),
  getBudgetById: (id: string | null) =>
    handleRequest(apiClient.get(`/budget/get/${id}`)),
  updateBudget: (body: updateBudgetPayload, id: string | null) =>
    handleRequest(apiClient.put(`/budget/update/${id}`, body)),
  deleteBudget: (id: string) =>
    handleRequest(apiClient.delete(`/budget/delete/${id}`)),
  filterBudget: (body: filterBudgetPayload) =>
    handleRequest(apiClient.post("/budget/filter", body)),
};
