import type React from "react";
import { useState } from "react";
import { useSendForgotEmail } from "../api/users/user-hooks";

export default function ForgotPassword() {
  const [data, setData] = useState({
    emailId: "",
  });

  const { mutate, isPending } = useSendForgotEmail();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      emailId: data?.emailId,
    };

    mutate(payload);
  };
  return (
    <>
      <div className="forgot-container flex justify-center items-center min-h-screen px-4">
        <div className=" bg-[#548f54] w-full max-w-md lg:w-[400px] md:max-w-xl sm:max-w-lg rounded-2xl shadow-lg">
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 sm:p-10 md:p-14 lg:p-16"
          >
            <h1 className="text-center text-white text-xl font-bold">
              FORGOT PASSWORD
            </h1>
            <input
              type="text"
              name="emailId"
              id="emailId"
              value={data?.emailId}
              onChange={handleChange}
              placeholder="Enter your EmailId"
              className="w-full p-2 rounded-lg text-sm border border-gray-400 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={isPending}
              className={`bg-[#2C2C2C] w-full h-11 rounded-full text-white font-semibold transition-all duration-300 flex justify-center items-center gap-2 ${
                isPending
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-[#5B3256]"
              }`}
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                "Sent Otp"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
