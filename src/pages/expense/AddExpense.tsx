// export default function AddIncome() {
//   return (
//     <>
//       <div className="h-min-screen p-2">
//         <h1 className="text-[#548f54] text-bold text-xl font-semibold px-8">
//           Add Income
//         </h1>
//         <div className=" rounded-2xl p-4 w-[450px] mx-4">
//           {/* Row 1 */}
//           <div className="flex flex-row gap-8 mb-4">
//             <div className="flex flex-col w-full">
//               <label
//                 htmlFor="category"
//                 className="text-sm text-white-600 mb-2 font-medium "
//               >
//                 Choose Category<span className="text-red-600 p-2">*</span>
//               </label>
//               <select
//                 id="gender"
//                 className="w-[350px] h-11 px-4 rounded-lg border border-gray-300
//              bg-[rgba(255,255,255,0.15)]"
//               >
//                 <option>Select Gender</option>
//                 <option value="Salery" className="bg-[rgba(255,255,255,0.15)]">
//                   Salery
//                 </option>
//                 <option value="Business">Business</option>
//                 <option value="Investments">Investments</option>
//                 <option value="Freelancing">Freelancing</option>
//                 <option value="Freelancing">Others</option>
//               </select>
//             </div>
//           </div>

import { MdKeyboardArrowDown } from "react-icons/md";

//           {/* Row 2 */}
//           <div className="flex flex-row gap-8 mb-4">
//             <div className="flex flex-col w-full">
//               <label
//                 htmlFor="income_amount"
//                 className="text-sm text-white-600 mb-2 font-medium"
//               >
//                 Income Amount<span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="income_amount"
//                 placeholder="Enter your amount"
//                 className="w-[350px] h-11 px-4 rounded-lg border border-gray-300
//              bg-[rgba(255,255,255,0.15)] backdrop-blur-md
//              text-white-600 text-sm placeholder-text-white
//              focus:outline-none focus:ring-2 focus:ring-blue-400
//              transition-all duration-200"
//               />
//             </div>
//           </div>

//           {/* Row 3 */}
//           <div className="flex flex-row gap-8 mb-4">
//             <div className="flex flex-col w-full">
//               <label
//                 htmlFor="income_date"
//                 className="text-sm text-white-600 mb-2 font-medium"
//               >
//                 Date <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="date"
//                 id="income_date"
//                 className="w-[350px] h-11 px-4 rounded-lg border border-gray-300
//              bg-[rgba(255,255,255,0.15)] backdrop-blur-md
//              text-white-600 text-sm placeholder-text-white
//              focus:outline-none focus:ring-2 focus:ring-blue-400
//              transition-all duration-200"
//               />
//             </div>
//           </div>

//           {/* Row 4 */}
//           <div className="flex flex-row gap-8 mb-4">
//             <div className="flex flex-col w-full">
//               <label
//                 htmlFor="payment_mode"
//                 className="text-sm text-white-600 mb-2 font-medium"
//               >
//                 Choose Payment Mode<span className="text-red-600 p-2">*</span>
//               </label>
//               <select
//                 id="payment_mode"
//                 className="w-[350px] h-11 px-4 rounded-lg border border-gray-300
//              bg-[rgba(255,255,255,0.15)] backdrop-blur-md
//              text-white-600 text-sm placeholder-text-white
//              focus:outline-none focus:ring-2 focus:ring-blue-400
//              transition-all duration-200"
//               >
//                 <option
//                   value=""
//                   className="w-[350px] h-11 px-4 rounded-lg border border-gray-300
//              bg-[rgba(255,255,255,0.15)] backdrop-blur-md
//              text-white-600 text-sm placeholder-text-white
//              focus:outline-none focus:ring-2 focus:ring-blue-400
//              transition-all duration-200"
//                 >
//                   Select Payment Mode
//                 </option>
//                 <option value="Cash" className="bg-[rgba(255,255,255,0.15)]">
//                   Cash
//                 </option>
//                 <option value="Account" className="bg-[rgba(255,255,255,0.15)]">
//                   Account
//                 </option>
//                 <option value="G-pay" className="bg-[rgba(255,255,255,0.15)]">
//                   G-pay
//                 </option>
//                 <option value="Phone-pay">Phone-pay</option>
//                 <option value="Freelancing">Others</option>
//               </select>
//             </div>
//           </div>
//           {/* Address Field */}
//           <div className="flex flex-col w-full">
//             <label
//               htmlFor="address"
//               className="text-sm text-white-600 mb-2 font-medium"
//             >
//               Notes(optional)
//             </label>
//             <div className="flex items-end justify-between gap-8">
//               <textarea
//                 name="address"
//                 id="address"
//                 placeholder="Address"
//                 rows={4}
//                 className="w-[350px] h-20 px-4 rounded-lg border border-gray-300
//              bg-[rgba(255,255,255,0.15)] backdrop-blur-md
//              text-white-600 text-sm placeholder-text-white
//              focus:outline-none focus:ring-2 focus:ring-blue-400
//              transition-all duration-200 p-2"
//               ></textarea>

//               {/* Save Button on the same row — right aligned */}
//             </div>
//           </div>
//           <div className=" flex justify-center items-center">
//             <button className="bg-[#548f54] hover:bg-[#5B3256] text-white font-medium py-2 px-6 my-4 rounded-lg shadow-md transition-all duration-200">
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default function AddExpense() {
  return (
    <div className="min-h-full">
      <h1 className="text-[#548f54] text-2xl font-semibold mb-4 px-2">
        Add Expense
      </h1>

      <div className="rounded-2xl p-4 shadow-lg w-full max-w-[1200px] mx-auto bg-[rgba(255,255,255,0.05)]">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                id="category"
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
            <label
              htmlFor="income_amount"
              className="text-sm text-white mb-2 font-medium"
            >
              Income Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
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
          <div className="flex flex-col">
            <label
              htmlFor="payment_mode"
              className="text-sm text-white mb-2 font-medium"
            >
              Choose Payment Mode <span className="text-red-600">*</span>
            </label>
            <select
              id="payment_mode"
              className="h-11 px-4 rounded-lg border border-gray-400 bg-[rgba(255,255,255,0.15)]
              text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            >
              <option>Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="Account">Account</option>
              <option value="GPay">GPay</option>
              <option value="PhonePe">PhonePe</option>
              <option value="Others">Others</option>
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
          <button className="bg-[#548f54] hover:bg-[#5B3256] text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
