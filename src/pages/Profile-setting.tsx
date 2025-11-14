import React, { useRef, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useGetUser, useUpdateUser } from "../api/users/user-hooks";

export default function ProfileSetting() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate, isPending } = useUpdateUser();
  const { data: userData } = useGetUser();

  const [data, setData] = useState({
    username: "",
    lastName: "",
    mobileNumber: "",
    emailId: "",
    user_profile: "",
    age: "",
    gender: "",
    address: "",
  });

  React.useEffect(() => {
    if (userData?.data) {
      console.log("userdata is---", userData?.data);
      setData({
        username: userData.data.username || "",
        lastName: userData.data.lastName || "",
        mobileNumber: userData.data.mobileNumber || "",
        emailId: userData.data.emailId || "",
        user_profile: userData.data.user_profile || "",
        age: userData.data.age || "",
        gender: userData.data.gender || "",
        address: userData.data.address || "",
      });
      if (userData.data.user_profile) {
        setPreviewUrl(userData.data.user_profile);
      }
    }
  }, [userData]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target as HTMLInputElement;

    if (target.type === "file" && target.files?.[0]) {
      const selectedFile = target.files[0];
      console.log("Selected file:", selectedFile);
      setFile(selectedFile);

      //  Create preview URL for the <img>
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      const { name, value } = target;
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("lastName", data.lastName);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("emailId", data.emailId);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("address", data.address);

    if (file) formData.append("user_profile", file);

    mutate(formData);
  };

  return (
    <div className="flex flex-col items-start justify-center h-[610px] bg-light-grey p-4">
      {/* Profile Picture */}
      <div className="flex flex-row items-center justify-center mb-10 mx-8  ">
        <div className="relative w-40 h-40">
          <input
            ref={fileInputRef}
            type="file"
            id="user_profile"
            name="user_profile"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="profile"
              className="w-40 h-40 rounded-full object-cover shadow-md border border-gray-200"
            />
          ) : (
            <div className="w-40 h-40 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.15)] text-sm font-medium shadow-inner">
              No Image
            </div>
          )}

          <button
            onClick={handleIconClick}
            className="absolute bottom-1 right-1 rounded-full p-1 bg-white shadow-md hover:scale-105 transition-transform"
          >
            <IoAddCircleSharp className="text-2xl text-blue-500" />
          </button>
        </div>
        <div className="p-10">
          <p className="text-start text-lg font-bold text-[#548f54]">
            Profile Setting
          </p>
          <p className="text-white-500 text-sm">
            Update your personal information below
          </p>
        </div>
      </div>

      {/* Form Section */}
      <form action="" onSubmit={handleSubmit}>
        <div className=" rounded-2xl p-2 w-[700px] mx-8">
          {/* Row 1 */}
          <div className="flex flex-row gap-8 mb-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="username"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your first name"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 
                bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
                text-white-600 text-sm placeholder-text-white
                focus:outline-none focus:ring-2 focus:ring-blue-400 
                transition-all duration-200"
                value={data?.username}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="lastName"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 
                bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
                text-white-600 text-sm placeholder-text-white
                focus:outline-none focus:ring-2 focus:ring-blue-400 
                transition-all duration-200"
                value={data?.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-row gap-8 mb-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="mobileNumber"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter your phone no"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
                value={data?.mobileNumber}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="emailId"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                Email ID <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                placeholder="Enter your email"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
                value={data?.emailId}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-row gap-8 mb-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="age"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                placeholder="Enter your age"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
                value={data?.age}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="gender"
                className="text-sm text-white-600 mb-2 font-medium"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
                value={data?.gender}
                onChange={handleChange}
              >
                <option
                  value=""
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
                >
                  Select Gender
                </option>
                <option value="Male" className="bg-[rgba(255,255,255,0.15)]">
                  Male
                </option>
                <option value="Female" className="bg-[rgba(255,255,255,0.15)]">
                  Female
                </option>
                <option value="Others" className="bg-[rgba(255,255,255,0.15)]">
                  Others
                </option>
              </select>
            </div>
          </div>
          {/* Address Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="address"
              className="text-sm text-white-600 mb-2 font-medium"
            >
              Address
            </label>
            <div className="flex items-end justify-between gap-8">
              <textarea
                name="address"
                id="address"
                placeholder="Address"
                rows={4}
                className="w-full h-20 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200 p-2"
                value={data?.address}
                onChange={handleChange}
              ></textarea>

              {/* Save Button on the same row — right aligned */}
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
                    <span>Updating...</span>
                  </>
                ) : (
                  "Update Account"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
