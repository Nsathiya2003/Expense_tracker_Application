import AddBudget from "./AddBudget";
import BudgetTable from "./BudgetTable";

export default function ViewBudget() {
  return (
    <div className="flex flex-col gap-6 px-4 py-2">
      <AddBudget />
      <BudgetTable />
    </div>
  );
}
