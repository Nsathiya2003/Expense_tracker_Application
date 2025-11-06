import React, { useRef, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

export default function ProfileSetting() {
  const [file, setFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-start justify-center h-[610px] bg-light-grey p-4">
      {/* Profile Picture */}
      <div className="flex flex-row items-center justify-center mb-10 mx-8  ">
        <div className="relative w-40 h-40">
          <input
            ref={fileInputRef}
            type="file"
            id="profile"
            name="profile"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />

          {file ? (
            <img
              src={file}
              alt="profile"
              className="w-40 h-40 rounded-full object-cover shadow-md border border-gray-200"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center  bg-[rgba(255,255,255,0.15)] text-sm font-medium shadow-inner">
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
      <div className=" rounded-2xl p-2 w-[700px] mx-8">
        {/* Row 1 */}
        <div className="flex flex-row gap-8 mb-4">
          <div className="flex flex-col w-full">
            <label
              htmlFor="firstName"
              className="text-sm text-white-600 mb-2 font-medium"
            >
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
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
              placeholder="Enter your last name"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
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
              placeholder="Enter your phone no"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
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
              placeholder="Enter your email"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 
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
              htmlFor="age"
              className="text-sm text-white-600 mb-2 font-medium"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              placeholder="Enter your age"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
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
              className="w-full h-11 px-4 rounded-lg border border-gray-300 
             bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
             text-white-600 text-sm placeholder-text-white
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             transition-all duration-200"
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
            ></textarea>

            {/* Save Button on the same row — right aligned */}
            <button className="bg-[#548f54] hover:bg-[#5B3256] text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200 self-end flex justify-end">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
