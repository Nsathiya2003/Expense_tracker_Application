import { useState } from "react";
import type { FormData } from "../types/types";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useCreateUser } from "../api/users/user-hooks";

export default function Register() {
  const [data, setData] = useState<FormData>({
    username: "",
    mobileNumber: "",
    emailId: "",
    password: "",
    lastName: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { mutate, isPending } = useCreateUser();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name as keyof FormData]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //call the user create mutation...
    const payload = {
      username: data?.username,
      lastName: data?.lastName,
      mobileNumber: data?.mobileNumber,
      emailId: data?.emailId,
      password: data?.password,
    };

    mutate(payload);
    //set the values empty...
    setData({
      username: "",
      mobileNumber: "",
      emailId: "",
      password: "",
      lastName: "",
    });
  };

  return (
    <>
      <div className="register-container flex justify-center items-center min-h-screen  px-4">
        <div className="bg-[#548f54] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[400px] rounded-2xl shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-6 sm:p-10 md:p-12 lg:p-16"
          >
            <h1 className="text-center text-2xl font-bold text-white">
              SIGN UP
            </h1>
            <p className="text-center text-gray-200 text-sm">
              Already have an account?{" "}
              <a
                href="/"
                className="text-blue-900 font-semibold hover:underline transition-all duration-400"
              >
                Login
              </a>
            </p>

            {/* Username */}
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
            />

            {/* Initial */}
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={data.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
            />

            {/* Mobile Number */}
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              value={data.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
            />

            {/* Email ID */}
            <input
              type="email"
              name="emailId"
              id="emailId"
              value={data.emailId}
              onChange={handleChange}
              placeholder="Enter your email ID"
              className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
              />
              {passwordVisible ? (
                <FaEyeSlash
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
                />
              )}
            </div>

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
                  <span>Creating...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
