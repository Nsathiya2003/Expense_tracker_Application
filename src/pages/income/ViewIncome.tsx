import { useState } from "react";
import AddIncome from "./AddIncome";
import IncomeTable from "./IncomeTable";

export default function ViewGoal() {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col p-2">
      <AddIncome editingId={editingId} />
      <div className="-mt-2">
        <IncomeTable
          onEdit={(id) => {
            setEditingId(id);
            // setOpenAdd(true);
          }}
        />
      </div>
    </div>
  );
}
