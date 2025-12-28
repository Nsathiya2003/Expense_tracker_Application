import { useState } from "react";
import AddIncome from "./AddIncome";
import IncomeTable from "./IncomeTable";

export default function ViewIncome() {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col p-2">
      <AddIncome editingId={editingId} setEditingId={setEditingId} />
      <div className="-mt-2">
        <IncomeTable
          onEdit={(id) => {
            // Force a prop-change even if same id is clicked repeatedly:
            setEditingId(null);
            setTimeout(() => setEditingId(id), 0);
            // setOpenAdd(true);
          }}
        />
      </div>
    </div>
  );
}
