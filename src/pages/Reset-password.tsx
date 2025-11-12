import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPassword } from "../api/users/user-hooks";

export default function ResetPassword() {
  const [data, setData] = useState({
    otp: "",
    password: "",
    confirm_password: "",
    emailId: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { mutate, isPending } = useResetPassword();

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

    const payload = {
      emailId: data.emailId,
      password: data.password,
      otp: data.otp,
    };
    mutate(payload);
  };
  return (
    <>
      <div className="reset-container flex justify-center items-center min-h-screen">
        <div className="bg-[#548f54] w-full max-w-md md:max-w-xl lg:max-w-[400px] rounded-2xl shadow-lg">
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 px-4 p-16 md:10 lg:18 sm-12"
          >
            <h1 className="text-white font-bold text-center text-xl">
              RESET PASSWORD
            </h1>
            <input
              type="text"
              id="emailId"
              name="emailId"
              placeholder="Enter your emailId"
              value={data.emailId}
              onChange={handleChange}
              className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
            />
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter 6 digits otp"
              value={data.otp}
              onChange={handleChange}
              className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
            />
            <div className="relative w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                placeholder="New password"
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
            <div className="relative w-full">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirm_password"
                id="confirm_password"
                value={data.confirm_password}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
              />
              {confirmPasswordVisible ? (
                <FaEyeSlash
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
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
                  <span>Reset...</span>
                </>
              ) : (
                "Reset Password"
              )}
            </button>{" "}
          </form>
        </div>
      </div>
    </>
  );
}
