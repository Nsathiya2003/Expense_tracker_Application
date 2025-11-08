import AddIncome from "./AddIncome";
import IncomeTable from "./IncomeTable";

export default function ViewGoal() {
  return (
    <div className="flex flex-col p-2">
      <AddIncome />
      <div className="-mt-2">
        <IncomeTable />
      </div>
    </div>
  );
}
