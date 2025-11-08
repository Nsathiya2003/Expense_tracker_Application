import AddBudget from "./AddBudget";
import BudgetTable from "./BudgetTable";

export default function ViewBudget() {
  return (
    <>
      <div className="flex flex-row ">
        <AddBudget />
        <BudgetTable />
      </div>
    </>
  );
}
