import AddExpense from "./AddExpense";
import IncomeTable from "./IncomeTable";

export default function ViewExpense() {
  return (
    <>
      <div className="flex flex-row ">
        <AddExpense />
        <IncomeTable />
      </div>
    </>
  );
}
