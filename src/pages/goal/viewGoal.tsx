import { useState } from "react";
import AddGoal from "./AddGoal";
import GoalTable from "./GoalTable";

export default function ViewGoal() {
  // const [openAdd, setOpenAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 p-4">
      <AddGoal editingId={editingId} />

      <GoalTable
        onEdit={(id) => {
          setEditingId(id);
          // setOpenAdd(true);
        }}
      />
    </div>
  );
}
