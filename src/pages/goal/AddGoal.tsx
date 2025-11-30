import React, { useEffect, useState } from "react";
import type { UpdateGoalPayload } from "../../api/goal/goalApi";
import {
  useCreateGoal,
  useGetGoalById,
  useUpdateGoal,
} from "../../api/goal/goal-hooks";

export default function AddGoal({ editingId }: { editingId: string | null }) {
  console.log("editingId----", editingId);
  const [data, setData] = useState({
    goal_name: "",
    target_amount: "",
    deadline_date: "",
    notes: "",
  });

  const resetForm = () => {
    setData({
      goal_name: "",
      target_amount: "",
      deadline_date: "",
      notes: "",
    });
  };

  //for create goal...
  const { mutate } = useCreateGoal(resetForm);

  //update the goal...
  const { mutate: updateGoal } = useUpdateGoal(resetForm);

  //for get gaol by id...
  const { data: goalById } = useGetGoalById(editingId);

  useEffect(() => {
    if (goalById?.data) {
      console.log("goalById----", goalById?.data);
      setData({
        goal_name: goalById?.data?.goal_name,
        target_amount: goalById?.data?.target_amount,
        deadline_date: goalById.data.deadline_date
          ? new Date(goalById.data.deadline_date).toISOString().split("T")[0]
          : "",
        notes: goalById?.data?.notes,
      });
    }
  }, [goalById?.data]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: UpdateGoalPayload = {
      goal_name: data?.goal_name,
      target_amount: Number(data?.target_amount),
      deadline_date: new Date(data?.deadline_date),
      notes: data?.notes,
      id: goalById?.data?._id,
    };
    if (goalById?.data?._id) {
      updateGoal(payload);
    } else {
      mutate(payload);
    }
  };
  return (
    <div className="h-min-screen">
      <h1 className="text-[#548f54] text-2xl font-semibold px-2">
        {editingId ? "Edit Goal" : "Add Goal"}
      </h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="rounded-2xl p-6 shadow-lg w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Goal Name */}
            <div className="flex flex-col flex-1">
              <label
                htmlFor="goal_name"
                className="text-sm text-white mb-2 font-medium"
              >
                Goal Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="goal_name"
                name="goal_name"
                value={data?.goal_name}
                onChange={handleChange}
                placeholder="Enter your goal"
                className="w-full h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              />
            </div>

            {/* Target Amount */}
            <div className="flex flex-col flex-1">
              <label
                htmlFor="target_amount"
                className="text-sm text-white mb-2 font-medium"
              >
                Target Amount <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="target_amount"
                name="target_amount"
                value={data?.target_amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              />
            </div>

            {/* Target Date */}
            <div className="flex flex-col flex-1">
              <label
                htmlFor="deadline_date"
                className="text-sm text-white mb-2 font-medium"
              >
                Target Date/Deadline <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="deadline_date"
                name="deadline_date"
                value={data?.deadline_date}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col flex-1">
              <label
                htmlFor="notes"
                className="text-sm text-white mb-2 font-medium"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={data?.notes}
                onChange={handleChange}
                placeholder="Add notes"
                rows={1}
                className="w-full h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              ></textarea>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="notify_exceed"
                className="h-5 w-5 accent-green-400 hover:cursor-pointer"
              />
              <label htmlFor="notify_exceed" className="text-white text-sm">
                Notify when goal is exceeded
              </label>
            </div>
            {/* Save Button */}
            <div className="flex justify-start  ">
              <button
                className="bg-[#548f54] hover:bg-[#5B3256] text-white font-medium py-2 
              px-6 rounded-lg shadow-md transition-all duration-200"
              >
                {/* {isPending ? <TableLoader /> : "Save"} */}
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
