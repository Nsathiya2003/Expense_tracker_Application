import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";
import { useCreateIncome } from "../../api/income/income-hooks";
import type { CreateIncomePayload } from "../../api/income/incomeApi";

export default function AddIncome() {
  const [openDialog, setOpenDialog] = useState(false);

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

  const { mutate } = useCreateIncome(resetForm);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value, // ✔ always store as string
    }));
  };

  const handleSubmit = () => {
    if (!data.income_date) {
      alert("Please choose a date");
      return;
    }

    const payload: CreateIncomePayload = {
      income_category: data.income_category,
      income_amount: Number(data.income_amount) || 0,
      notes: data.notes,
      payment_receive_mode: data.payment_receive_mode,
      income_date: new Date(data.income_date),
      saving_contribution: choice === "yes",
      goal_contribute_amount: Number(data.goal_contribute_amount) || 0,
      goal_id: data.goal_id,
    };

    mutate(payload);
  };

  const DialogGoalBody = () => {
    const [localChoice, setLocalChoice] = useState<"yes" | "no" | null>(choice);
    const [localGoalId, setLocalGoalId] = useState(data.goal_id);
    const [localAmount, setLocalAmount] = useState(data.goal_contribute_amount);

    const handleSave = () => {
      setChoice(localChoice);

      setData((prev) => ({
        ...prev,
        goal_id: localGoalId,
        goal_contribute_amount: localAmount,
        saving_contribution: localChoice === "yes",
      }));

      setOpenDialog(false);
      handleSubmit();
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
              onChange={() => setLocalChoice("no")}
            />
            No
          </label>
        </div>

        {localChoice === "yes" && (
          <>
            <div className="flex flex-col gap-3 mt-2">
              <label className="text-sm">Choose Saving Goal</label>
              <select
                className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm"
                value={localGoalId}
                onChange={(e) => setLocalGoalId(e.target.value)}
              >
                <option value="">Select a goal</option>
                <option value="Emergency">Emergency Fund</option>
                <option value="Vacation">Vacation</option>
                <option value="Vehicle">New Vehicle</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <label className="text-sm text-white mb-2 font-medium">
              Saving Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
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
        Add Income
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
          Save
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
