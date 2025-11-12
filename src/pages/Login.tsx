import { useState } from "react";
import type { LoginData } from "../types/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginUser } from "../api/users/user-hooks";

export default function Login() {
  const [data, setData] = useState<LoginData>({
    emailId: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { mutate, isPending } = useLoginUser();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name as keyof LoginData]: value,
    }));
  };
  console.log("data is---", data);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      emailId: data?.emailId,
      password: data?.password,
    };
    mutate(payload);
    // navigate("/dashboard");
  };

  return (
    <>
      <div className="login-container flex justify-center items-center min-h-screen px-4">
        <div className=" bg-[#548f54] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[400px] rounded-2xl shadow-lg">
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-24 sm:p-18 md:p-16 lg:p-16"
          >
            <h1 className="text-center text-2xl font-bold text-white">LOGIN</h1>
            <p className="text-center text-sm text-gray-200">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-900 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
            <input
              type="text"
              name="emailId"
              id="emailId"
              placeholder="Enter your emailId"
              value={data.emailId}
              onChange={(e) => handleChange(e)}
              className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
            />

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

            <a
              href="/forgot-password"
              className="text-red-600 text-end text-sm text-bold"
            >
              forgot password?
            </a>

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
                  <span>Login...</span>
                </>
              ) : (
                "Login Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
