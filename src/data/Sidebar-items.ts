import { FaCommentDollar, FaChartLine, FaCog } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";

export const SidebarItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    icon: MdDashboard,
    routes: "/dashboard",
    description: "Manage all our expenses and incomes",
  },
  {
    label: "Transaction",
    title: "Transaction",
    icon: FaCommentDollar,
    routes: "/transaction",
    description: "Manage transactions (both expense and income)",
    subItems: [
      {
        label: "Income",
        title: "Income",
        icon: GiReceiveMoney,
        routes: "/income",
        description: "Income data management",
      },
      {
        label: "Expense",
        title: "Expense",
        icon: GiPayMoney,
        routes: "/expense",
        description: "Expense data management",
      },
    ],
  },
  {
    label: "Reports",
    title: "Reports",
    icon: FaChartLine,
    routes: "/reports",
    description: "View reports and analytics",
  },
  {
    label: "Settings",
    title: "Settings",
    icon: FaCog,
    routes: "/settings",
    description: "Manage application settings",
  },
];
