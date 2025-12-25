import React, { useRef, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useGetUser, useUpdateUser } from "../api/users/user-hooks";
import { baseImgUrl } from "../api/apiClient";
import RegisterImage from "../assets/expense2.png";

export default function ProfileSetting() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  //get userId...
  const userId = localStorage.getItem("user_id");

  const { mutate, isPending } = useUpdateUser(userId);
  const { data: userData } = useGetUser(userId);
  console.log({ isPending });
  console.log({ userData });

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
      if (userData.data.file_path) {
        console.log("baseImgUrl---", baseImgUrl);
        setPreviewUrl(`${baseImgUrl}${userData?.data?.file_path}`);
      }
    }
  }, [userData]);
  console.log("previewUrl is----", previewUrl);

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
    <div className="flex h-[610px] bg-gray-800 overflow-hidden">
      {/* ================= LEFT SIDEBAR IMAGE ================= */}
      <div className="hidden md:flex w-[35%] h-full items-center justify-center bg-gray-600">
        <img
          src={RegisterImage}
          alt="Profile Illustration"
          className="w-[80%] h-auto object-contain"
        />
      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="flex flex-col items-start justify-center w-full md:w-[65%] p-6 bg-gray-800">
        {/* ================= PROFILE HEADER ================= */}
        <div className="flex flex-row items-center mb-10">
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
                className="w-40 h-40 rounded-full object-cover border border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-40 h-40 rounded-full flex items-center justify-center bg-gray-100 text-sm text-gray-500 border">
                No Image
              </div>
            )}

            <button
              onClick={handleIconClick}
              className="absolute bottom-2 right-2 rounded-full p-1 bg-gray-600 shadow hover:scale-105 transition"
            >
              <IoAddCircleSharp className="text-2xl text-blue-500" />
            </button>
          </div>

          <div className="ml-8">
            <p className="text-lg font-bold text-[#548f54]">Profile Setting</p>
            <p className="text-gray-500 text-sm">
              Update your personal information below
            </p>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit}>
          <div className="w-[700px]">
            {/* Row 1 */}
            <div className="flex gap-8 mb-4">
              <div className="w-full">
                <label className="text-sm font-medium text-white mb-1 block">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-600
                text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="w-full">
                <label className="text-sm font-medium text-white mb-1 block">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-600
                text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-8 mb-4">
              <div className="w-full">
                <label className="text-sm font-medium text-white mb-1 block">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={data.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-600
                text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="w-full">
                <label className="text-sm font-medium text-white mb-1 block">
                  Email ID <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={data.emailId}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-600
                text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-8 mb-4">
              <div className="w-full">
                <label className="text-sm font-medium text-white mb-1 block">
                  Age
                </label>
                <input
                  type="text"
                  name="age"
                  value={data.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-600
                text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="w-full">
                <label className="text-sm font-medium text-white mb-1 block">
                  Gender
                </label>
                <select
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-600
                text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            {/* Address + Button */}
            <div className="flex gap-8 items-end">
              <div className="w-full">
                <label className="text-sm font-medium text-white mb-1 block">
                  Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={data.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-gray-600
                text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`w-full h-11 rounded-full text-white font-semibold transition
              ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#548f54] hover:bg-[#446f44]"
              }`}
              >
                {isPending ? "Updating..." : "Update Account"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
