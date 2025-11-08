import AddExpense from "./AddExpense";
import ExpenseTable from "./expenseTable";

export default function ViewExpense() {
  return (
    <div className="flex flex-col p-2">
      <AddExpense />
      <div className="-mt-2">
        <ExpenseTable />
      </div>
    </div>
  );
}
