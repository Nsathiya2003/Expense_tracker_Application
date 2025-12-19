import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";
import {
  useCreateIncome,
  useGetIncomeById,
  useUpdateIncome,
  type updateIncomePayload,
} from "../../api/income/income-hooks";
import { useParams } from "react-router-dom";
import { useFindAllGoal } from "../../api/goal/goal-hooks";
import type { GoalDataTypes } from "../../types/response-types";

// type IncomeProps = {
//   id: string;
// };

export default function AddIncome({ editingId }: { editingId: string | null }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams<string>();

  const [data, setData] = useState({
    income_category: "",
    income_amount: "",
    income_date: "",
    payment_receive_mode: "",
    notes: "",
    saving_contribution: false,
    goal_id: "",
    goal_contribute_amount: "",
  });

  //get income data by id
  console.log("id----", id);
  const { data: incomeById } = useGetIncomeById(editingId);

  //get all goals
  const { data: GoalData } = useFindAllGoal();
  console.log(GoalData?.data && GoalData?.data?.length > 0, "GoalData");

  // Fetch data by ID and update state
  useEffect(() => {
    if (incomeById?.data) {
      console.log(
        "income date is----",
        new Date(incomeById?.data?.income_date).toLocaleDateString().split("T")[
          "0"
        ]
      );
      setData({
        income_amount: incomeById.data.income_amount,
        income_category: incomeById.data.income_category,
        income_date: incomeById.data.income_date
          ? new Date(incomeById.data.income_date).toISOString().split("T")[0]
          : "",
        payment_receive_mode: incomeById.data.payment_receive_mode,
        notes: incomeById.data.notes,
        saving_contribution: incomeById.data.saving_contribution,
        goal_contribute_amount: incomeById.data.goal_contribute_amount,
        goal_id: incomeById.data.goal_id,
      });
    }
  }, [incomeById?.data]);

  //reset form
  const resetForm = () => {
    setData({
      income_category: "",
      income_amount: "",
      income_date: "",
      payment_receive_mode: "",
      notes: "",
      saving_contribution: false,
      goal_id: "",
      goal_contribute_amount: "",
    });

    setChoice(null); // reset yes/no
  };

  const [choice, setChoice] = useState<"yes" | "no" | null>(null);

  // Add income api call...
  const { mutate } = useCreateIncome(resetForm);

  //update income api call
  const { mutate: updateIncome } = useUpdateIncome(resetForm);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    console.log("name value is-----", name, value);
    setData((prev) => ({
      ...prev,
      [name]: value, // ✔ always store as string
    }));

    console.log("data is---", data);
  };
  console.log("data is---", data);

  // Modify handleSubmit to accept overrides so dialog can submit correct values immediately
  const handleSubmit = (overrides?: Partial<updateIncomePayload>) => {
    const payload: updateIncomePayload = {
      income_category: overrides?.income_category ?? data.income_category,
      income_amount:
        overrides?.income_amount ?? (Number(data.income_amount) || 0),
      notes: overrides?.notes ?? data.notes,
      payment_receive_mode:
        overrides?.payment_receive_mode ?? data.payment_receive_mode,
      income_date: overrides?.income_date ?? new Date(data.income_date),
      saving_contribution: overrides?.saving_contribution ?? choice === "yes",
      goal_contribute_amount:
        Number(
          overrides?.goal_contribute_amount ??
            Number(data.goal_contribute_amount)
        ) || 0,
      goal_id: overrides?.goal_id ?? data.goal_id,
      id: incomeById?.data?._id,
    };

    if (incomeById?.data?._id) {
      updateIncome(payload);
    } else {
      mutate(payload);
      console.log("the final payload is----", payload);
    }
  };

  const DialogGoalBody = () => {
    // local states so user interactions inside dialog don't immediately mutate parent until Save
    const [localChoice, setLocalChoice] = useState<"yes" | "no" | null>(choice);
    const [localGoalId, setLocalGoalId] = useState<string>(data.goal_id ?? "");
    const [localAmount, setLocalAmount] = useState<string>(
      data.goal_contribute_amount ? String(data.goal_contribute_amount) : ""
    );

    // keep dialog locals in sync when dialog opens or parent data changes
    useEffect(() => {
      if (openDialog) {
        setLocalChoice(choice);
        setLocalGoalId(data.goal_id ?? "");
        setLocalAmount(
          data.goal_contribute_amount ? String(data.goal_contribute_amount) : ""
        );
      }
    }, [openDialog, data, choice]);

    const handleSave = () => {
      // propagate local values to parent
      setChoice(localChoice);
      setData((prev) => ({
        ...prev,
        goal_id: localGoalId,
        goal_contribute_amount: localAmount,
        saving_contribution: localChoice === "yes",
      }));

      // close dialog then submit using explicit overrides so payload is correct immediately
      setOpenDialog(false);

      handleSubmit({
        goal_id: localGoalId,
        goal_contribute_amount: Number(localAmount) || 0,
        saving_contribution: localChoice === "yes",
      });
    };

    return (
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium">
          Do you want to contribute part of this income to your saving goal?
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="saving"
              value="yes"
              checked={localChoice === "yes"}
              onChange={() => setLocalChoice("yes")}
            />
            Yes
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="saving"
              value="no"
              checked={localChoice === "no"}
              onChange={() => {
                setLocalChoice("no");
                setLocalGoalId("");
                setLocalAmount("");
              }}
            />
            No
          </label>
        </div>

        {localChoice === "yes" && (
          <>
            <div className="flex flex-col w-[350px] mb-4 relative">
              <label
                htmlFor="category"
                className="text-sm text-white mb-2 font-medium"
              >
                Choose Goal <span className="text-red-600">*</span>
              </label>

              <div className="relative w-[260px]">
                <select
                  id="category"
                  name="goal_id"
                  className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
      bg-[rgba(255,255,255,0.15)] text-white text-sm
      focus:outline-none focus:ring-2 focus:ring-green-400
      transition-all duration-200 appearance-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "white",
                  }}
                  value={localGoalId}
                  onChange={(e) => setLocalGoalId(e.target.value)}
                >
                  <option value="">Select goal</option>
                  {GoalData?.data && GoalData?.data?.length > 0 ? (
                    GoalData?.data.map((item: GoalDataTypes, index: number) => (
                      <option
                        value={item?._id}
                        key={index}
                        style={{
                          backgroundColor: "rgba(255,255,255,0.15)",
                          color: "white",
                        }}
                        className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
      bg-[rgba(255,255,255,0.15)] "
                      >
                        {item?.goal_name}
                      </option>
                    ))
                  ) : (
                    <option
                      disabled
                      className="bg-gray-800 text-gray-400 text-center"
                    >
                      No goals available...
                    </option>
                  )}
                </select>

                {/* Custom ▼ icon */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                  <MdKeyboardArrowDown size={20} />
                </span>
              </div>
            </div>

            {localGoalId !== "" && (
              <>
                <label className="text-sm text-white mb-2 font-medium">
                  Saving Amount <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="goal_contribute_amount"
                  value={localAmount}
                  onChange={(e) =>
                    setLocalAmount(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="Enter amount"
                  className="h-11 px-4 rounded-lg border border-gray-400 
              bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white"
                />
              </>
            )}
          </>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="bg-[#548f54] w-full h-11 rounded-lg"
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-full">
      <h1 className="text-[#548f54] text-2xl font-semibold mb-4 px-2">
        Income Details
      </h1>

      <div className="rounded-2xl p-4 shadow-lg w-full max-w-[1200px] mx-auto bg-[rgba(255,255,255,0.05)]">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Category */}
          <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:w-[260px] relative">
            <label
              htmlFor="category"
              className="text-sm text-white mb-2 font-medium"
            >
              Choose Category <span className="text-red-600">*</span>
            </label>

            <div className="relative">
              <select
                id="income_category"
                name="income_category"
                value={data?.income_category}
                onChange={handleChange}
                className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
      bg-[rgba(255,255,255,0.15)] text-white text-sm
      focus:outline-none focus:ring-2 focus:ring-green-400
      transition-all duration-200 appearance-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                <option value="">Select Category</option>
                <option value="Salary" className="bg-[#2E2E48] text-white">
                  Salary
                </option>
                <option value="Business" className="bg-[#2E2E48] text-white">
                  Business
                </option>
                <option value="Investments" className="bg-[#2E2E48] text-white">
                  Investments
                </option>
                <option value="Freelancing" className="bg-[#2E2E48] text-white">
                  Freelancing
                </option>
                <option value="Others" className="bg-[#2E2E48] text-white">
                  Others
                </option>
              </select>

              {/* Arrow Icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
          </div>

          {/* Income Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium">
              Income Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="income_amount"
              value={data.income_amount}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  income_amount: e.target.value.replace(/[^0-9]/g, ""),
                }))
              }
              placeholder="Enter your amount"
              className="h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium">
              Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="income_date"
              value={data.income_date}
              onChange={handleChange}
              className="h-11 px-4 rounded-lg border border-gray-400 
              bg-[rgba(255,255,255,0.15)] text-white text-sm"
            />
          </div>

          {/* Payment Mode */}
          <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:w-[260px] relative">
            <label
              htmlFor="category"
              className="text-sm text-white mb-2 font-medium"
            >
              Payment Mode<span className="text-red-600">*</span>
            </label>

            <div className="relative">
              <select
                id="payment_receive_mode"
                name="payment_receive_mode"
                value={data?.payment_receive_mode}
                onChange={handleChange}
                className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
      bg-[rgba(255,255,255,0.15)] text-white text-sm
      focus:outline-none focus:ring-2 focus:ring-green-400
      transition-all duration-200 appearance-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                <option value="">Payment Mode</option>
                <option value="Salary" className="bg-[#2E2E48] text-white">
                  Salary
                </option>
                <option value="Business" className="bg-[#2E2E48] text-white">
                  Business
                </option>
                <option value="Investments" className="bg-[#2E2E48] text-white">
                  Investments
                </option>
                <option value="Freelancing" className="bg-[#2E2E48] text-white">
                  Freelancing
                </option>
                <option value="Others" className="bg-[#2E2E48] text-white">
                  Others
                </option>
              </select>

              {/* Arrow Icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col lg:col-span-2">
            <label className="text-sm text-white mb-2 font-medium">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={data.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Add any notes here..."
              className="w-full px-4 py-2 rounded-lg border border-gray-400 
              bg-[rgba(255,255,255,0.15)] text-white text-sm"
            ></textarea>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-[#548f54] text-white font-medium py-2 px-6 rounded-lg shadow-md"
        >
          {incomeById?.data?._id ? "Edit Income" : "Save Income"}
        </button>
      </div>

      {/* Dialog */}
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

          <Dialog.Content
            className="fixed top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 
            bg-[#2E2E48] rounded-2xl shadow-lg p-6 text-white"
          >
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold">
                Saving Goal Contribution
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white">
                  <FiX size={22} />
                </button>
              </Dialog.Close>
            </div>

            <DialogGoalBody />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
