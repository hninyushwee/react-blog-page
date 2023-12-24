import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { ToastContainer } from "react-toastify";

export const EditProfileData = ({
  name,
  oldData,
  updateOtherData,
  setActiveProfile,
  label,
  placeholder = "",
  newPasswordInput,
  handlePassword,
}) => {
  const { theme, themeStyle } = useTheme();
  const [text, setText] = useState(oldData || "");
  const [newPassword, setNewPassword] = useState("");
  const isButtonDisable = text.length === 0;
  const isPasswordBtnDisable = text.length === 0 || newPassword.length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPasswordInput) {
      updateOtherData(name, text);
    } else {
      handlePassword(text, newPassword);
    }
  };
  return (
    <div className="bg-[#cbd5e163] left-0 top-0 fixed w-full min-h-screen ">
      <ToastContainer />
      <form
        action=""
        className="fixed w-60 sm:w-64 md:w-72 lg:w-80 rounded top-[23%] sm:top-[25%] md:top-[28%] lg:top-[30%] left-[23%] sm:left-[33%] md:left-[35%] lg:left-[40%] border shadow-lg border-[#9ca3afa1]"
        style={
          theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
        }
        onSubmit={handleSubmit}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setActiveProfile(null)}
            className="pl-1 pr-2 py-1 cursor-pointer  hover:bg-red-600 hover:text-white"
          >
            <XMarkIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="px-9">
          <h1 className="text-base md:text-lg lg:text-xl font-bold text-center mb-6">
            {label}
          </h1>
          <input
            type={newPasswordInput ? "password" : "text"}
            name={name}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className="text-sm md:text-base lg:text-base py-0.5 md:py-1 lg:py-1 block text-[#374151] mt-2 rounded md:rounded-md lg:rounded-md w-full border-0 text-grey-900 px-3 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {newPasswordInput && (
            <>
              <input
                type="password"
                value={newPassword}
                name="newPassword"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-4 text-sm md:text-base lg:text-base py-0.5 md:py-1 lg:py-1 block text-[#374151] rounded md:rounded-md lg:rounded-md w-full border-0 text-grey-900 px-3 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </>
          )}
          <div className="mb-9 mt-3">
            <button
              disabled={
                newPasswordInput ? isPasswordBtnDisable : isButtonDisable
              }
              className="disabled:bg-indigo-400 px-2 rounded-md bg-indigo-600 py-1 text-white cursor-pointer hover:ring-2 hover:ring-blue-500 hover:bg-white hover:text-black"
            >
              Change
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
