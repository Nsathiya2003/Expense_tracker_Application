import { useState } from "react";
import AddExpense from "./AddExpense";
import ExpenseTable from "./expenseTable";
import CurrentBalance from "../../component/current-balance";

export default function ViewExpense() {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col p-2">
      <CurrentBalance />
      <AddExpense editingId={editingId} />
      <div className="-mt-2">
        <ExpenseTable
          onEdit={(id) => {
            // Force a prop-change even if same id is clicked repeatedly:
            setEditingId(null);
            setTimeout(() => setEditingId(id), 0);
          }}
        />
      </div>
    </div>
  );
}
