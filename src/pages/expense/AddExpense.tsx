export default function AddExpense() {
  return (
    <>
      <div className="h-min-screen p-2">
        <h1 className="text-[#548f54] text-bold text-xl font-semibold px-8">
          Add Expense
        </h1>
        <div className=" rounded-2xl p-4 w-[450px] mx-4">
          {/* Row 1 */}
          <div className="flex flex-row gap-8 mb-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="category"
                className="text-sm text-white-600 mb-2 font-medium "
              >
                Choose Category<span className="text-red-600 p-2">*</span>
              </label>
              <select
                id="gender"
                className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)]"
              >
                <option>Select Gender</option>
                <option value="Salery" className="bg-[rgba(255,255,255,0.15)]">
                  Salery
                </option>
                <option value="Business">Business</option>
                <option value="Investments">Investments</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Freelancing">Others</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-row gap-8 mb-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="income_amount"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                Income Amount<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="income_amount"
                placeholder="Enter your amount"
                className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-row gap-8 mb-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="income_date"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="income_date"
                className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex flex-row gap-8 mb-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="payment_mode"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                Choose Payment Mode<span className="text-red-600 p-2">*</span>
              </label>
              <select
                id="payment_mode"
                className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
              >
                <option
                  value=""
                  className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
                >
                  Select Payment Mode
                </option>
                <option value="Cash" className="bg-[rgba(255,255,255,0.15)]">
                  Cash
                </option>
                <option value="Account" className="bg-[rgba(255,255,255,0.15)]">
                  Account
                </option>
                <option value="G-pay" className="bg-[rgba(255,255,255,0.15)]">
                  G-pay
                </option>
                <option value="Phone-pay">Phone-pay</option>
                <option value="Freelancing">Others</option>
              </select>
            </div>
          </div>
          {/* Address Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="address"
              className="text-sm text-white-600 mb-2 font-medium"
            >
              Notes(optional)
            </label>
            <div className="flex items-end justify-between gap-8">
              <textarea
                name="address"
                id="address"
                placeholder="Address"
                rows={4}
                className="w-[350px] h-20 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200 p-2"
              ></textarea>

              {/* Save Button on the same row — right aligned */}
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <button className="bg-[#548f54] hover:bg-[#5B3256] text-white font-medium py-2 px-6 my-4 rounded-lg shadow-md transition-all duration-200">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
