export type IncomeItem = {
  _id: string;
  category: string;
  income_amount: number;
  income_date: string;
  payment_receive_mode: string;
  notes: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  __v: number;
};
