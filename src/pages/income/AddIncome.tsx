import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";

export default function AddIncome() {
  const [openDialog, setOpenDialog] = useState(false);

  function DialogGoalBody({ onClose }: { onClose: () => void }) {
    const [choice, setChoice] = useState<"yes" | "no" | null>(null);

    return (
      <div className="flex flex-col gap-4">
        {/* Question */}
        <label className="text-sm font-medium">
          Do you want to contribute part of this income to your saving goal?
        </label>

        {/* Radio Buttons */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="goal_choice"
              value="yes"
              checked={choice === "yes"}
              onChange={() => setChoice("yes")}
              className="accent-[#548f54] w-4 h-4"
            />
            Yes
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="goal_choice"
              value="no"
              checked={choice === "no"}
              onChange={() => setChoice("no")}
              className="accent-[#548f54] w-4 h-4"
            />
            No
          </label>
        </div>

        {/* Conditional Goal Fields */}
        {choice === "yes" && (
          <>
            <div className="flex flex-col gap-3 mt-2">
              <label className="text-sm">Choose Saving Goal</label>
              <select className="h-10 px-3 rounded-md bg-[rgba(255,255,255,0.15)] border border-gray-400 text-white text-sm">
                <option>Select a goal</option>
                <option>Emergency Fund</option>
                <option>Vacation</option>
                <option>New Vehicle</option>
                <option>Others</option>
              </select>

              <label className="text-sm">Amount to Contribute</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="h-10 px-3 rounded-md bg-[rgba(255,255,255,0.15)] border border-gray-400 text-white text-sm"
              />
            </div>
          </>
        )}

        {/* Confirm Button */}
        <button
          onClick={onClose}
          className="mt-6 bg-[#548f54] hover:bg-green-600 rounded-md py-2 text-sm font-medium"
        >
          {choice === "yes" ? "Confirm & Save" : "Close"}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <h1 className="text-[#548f54] text-2xl font-semibold mb-4 px-2">
        Add Income
      </h1>

      <div className="rounded-2xl p-4 shadow-lg w-full max-w-[1200px] mx-auto bg-[rgba(255,255,255,0.05)]">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Category */}
          <div className="flex flex-col w-[350px] mb-4 relative">
            <label
              htmlFor="category"
              className="text-sm text-white mb-2 font-medium"
            >
              Choose Category <span className="text-red-600">*</span>
            </label>

            <div className="relative w-[260px] ">
              <select
                id="category"
                className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
      bg-[rgba(255,255,255,0.15)] text-white text-sm
      focus:outline-none focus:ring-2 focus:ring-green-400
      transition-all duration-200 appearance-none hover:cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                <option
                  value=""
                  className="bg-[#2E2E48] text-white hover:cursor-pointer"
                >
                  Select Category
                </option>
                <option
                  value="Food"
                  className="bg-[#2E2E48] text-white hover:cursor-pointer"
                >
                  Food
                </option>
                <option
                  value="Family"
                  className="bg-[#2E2E48] text-white hover:cursor-pointer"
                >
                  Family
                </option>
                <option
                  value="Education"
                  className="bg-[#2E2E48] text-white hover:cursor-pointer"
                >
                  Education
                </option>
                <option
                  value="Travel"
                  className="bg-[#2E2E48] text-white hover:cursor-pointer"
                >
                  Travel
                </option>
                <option
                  value="Others"
                  className="bg-[#2E2E48] text-white hover:cursor-pointer"
                >
                  Others
                </option>
              </select>

              {/* Custom ▼ icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
          </div>

          {/* Income Amount */}
          <div className="flex flex-col">
            <label
              htmlFor="income_amount"
              className="text-sm text-white mb-2 font-medium"
            >
              Income Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="income_amount"
              id="income_amount"
              placeholder="Enter your amount"
              className="h-11 px-4 rounded-lg border border-gray-400 
              bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
              focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label
              htmlFor="income_date"
              className="text-sm text-white mb-2 font-medium"
            >
              Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="income_date"
              className="h-11 px-4 rounded-lg border border-gray-400 
              bg-[rgba(255,255,255,0.15)] text-white text-sm
              focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            />
          </div>

          {/* Payment Mode */}
          <div className="flex flex-col w-[260px] mb-4 relative">
            <label
              htmlFor="category"
              className="text-sm text-white mb-2 font-medium"
            >
              Payment Mode <span className="text-red-600">*</span>
            </label>

            <select
              id="category"
              className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
      bg-[rgba(255,255,255,0.15)] text-white text-sm
      focus:outline-none focus:ring-2 focus:ring-green-400
      transition-all duration-200 appearance-none hover:cursor-pointer"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
              }}
            >
              <option className="bg-[#2E2E48] text-white hover:cursor-pointer">
                Select Payment Mode
              </option>
              <option
                value="Cash"
                className="bg-[#2E2E48] text-white hover:cursor-pointer"
              >
                Cash
              </option>
              <option
                value="Account"
                className="bg-[#2E2E48] text-white hover:cursor-pointer"
              >
                Account
              </option>
              <option
                value="GPay"
                className="bg-[#2E2E48] text-white hover:cursor-pointer"
              >
                GPay
              </option>
              <option
                value="PhonePe"
                className="bg-[#2E2E48] text-white hover:cursor-pointer"
              >
                PhonePe
              </option>
              <option
                value="Others"
                className="bg-[#2E2E48] text-white hover:cursor-pointer"
              >
                Others
              </option>
            </select>
          </div>
          {/* Notes */}
          <div className="flex flex-col lg:col-span-2">
            <label
              htmlFor="notes"
              className="text-sm text-white mb-2 font-medium"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              placeholder="Add any notes here..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-400 
              bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
              focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            ></textarea>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-start">
          <button
            onClick={() => setOpenDialog(true)}
            className="bg-[#548f54] hover:bg-[#5B3256] text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200"
          >
            Save
          </button>
        </div>
      </div>

      {/* Radix Dialog for Goal Saving */}
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

          {/* Content */}
          <Dialog.Content
            className="fixed top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 
      bg-[#2E2E48] rounded-2xl shadow-lg p-6 text-white focus:outline-none"
          >
            {/* Header */}
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

            {/* Body */}
            <DialogGoalBody onClose={() => setOpenDialog(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
