import AddGoal from "./AddGoal";
import GoalTable from "./GoalTable";

export default function ViewGoal() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <AddGoal />
      <GoalTable />
    </div>
  );
}
