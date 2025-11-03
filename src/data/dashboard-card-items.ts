import { MdPayment, MdSavings } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

export const CardItems = [
  {
    label: "Total Income",
    totalRecords: 15,
    totalAmount: 7000,
    icon: MdPayment,
    color: "rgba(34, 197, 94, 1)", // green
    description: "Your income summary...",
  },
  {
    label: "Total Expense",
    totalRecords: 12,
    totalAmount: 6000,
    icon: MdSavings,
    color: "rgba(240, 152, 152, 1)", // red
    description: "Your expense details...",
  },
  {
    label: "Total Budgets",
    totalRecords: 10,
    totalAmount: 10000,
    icon: FaMoneyBillWave,
    color: "rgba(59, 130, 246, 1)", // blue
    description: "Your budget overview...",
  },
];
