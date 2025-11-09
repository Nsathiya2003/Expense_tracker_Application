import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";

export default function FilterDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        {/* Overlay (optional subtle fade, can remove if not needed) */}
        <Dialog.Overlay className="fixed inset-0  data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />

        {/* Content positioned below the icon */}
        <Dialog.Content
          className={`absolute top-[200px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl 
          shadow-2xl border border-gray-700 w-[360px]
          data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Filter Options
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Filter Fields */}
          <div className="space-y-4">
            <div className="flex flex items-center gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  id="fromDate"
                  name="fromDate"
                  className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg  px-2 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  id="toDate"
                  name="toDate"
                  className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Category
              </label>
              <select className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none">
                <option>All</option>
                <option>Salary</option>
                <option>Freelance</option>
                <option>Investment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Payment Mode
              </label>
              <select className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none">
                <option>All</option>
                <option>Cash</option>
                <option>Bank</option>
                <option>UPI</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="bg-[#54af54] hover:bg-[#6ecf6e] px-4 py-2 rounded-lg text-sm"
            >
              Apply
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
