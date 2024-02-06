import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useApiData } from "../contexts/ApiDataContext";

function LoginPage() {
  const { theme, themeStyle } = useTheme();
  const { setLocalUserData } = useAuth();
  const { allUsers } = useApiData();
  // declare state for form input
  const [values, setValues] = useState({
    emailPhone: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const navigator = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //Validation login data
  const validate = (inputValues) => {
    let errors = {};

    // test user's input email and password is blank
    if (!inputValues.emailPhone) {
      errors.email = "Email or Phone is required!!";
    }
    if (!inputValues.password) {
      errors.password = "Password is required!!";
    }
    if (Object.keys(errors).length === 0) {
      // filter data from input email are equal with database email and test hash password this data
      const filterData = allUsers
        .filter(
          (user) =>
            user.email === inputValues.emailPhone ||
            user.phone === inputValues.emailPhone
        )
        .map((user) => {
          bcrypt.compare(
            inputValues.password,
            user.password,
            function (err, isMatch) {
              if (err) {
                throw err;
              } else if (!isMatch) {
                toast.error("Password is wrong!", {
                  position: toast.POSITION.TOP_RIGHT,
                  theme: "colored",
                });
              } else {
                // set user info to local storage
                localStorage.setItem("data_for_user", user.id);
                //login success message
                localStorage.setItem("SuccessToast", "false");
                //go to home page
                navigator("/", {
                  state: { loginSuccess: "Login successful" },
                  replace: true,
                });
                // get user info from local storage to show profile and user name in navabar
                const data = JSON.parse(localStorage.getItem("data_for_user"));
                if (data) {
                  setLocalUserData(data);
                }
              }
            }
          );
        });
      if (filterData.length === 0) {
        toast.error("Email or Phone was not found!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          autoClose: 3000
        });
      }
    }
    setErrorMessage(errors);
  };
  //form submit test email or phone number and password is validate
  const handleSubmit = (e) => {
    e.preventDefault();
    validate(values);
  };
  return (
    <div>
      <ToastContainer />
      <div
        style={
          theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
        }
        className="flex flex-col py-4 px-9 m-auto w-64 sm:w-72 md:w-80 lg:w-80 mt-5 border border-[#9ca3afa1] rounded shadow-lg"
      >
        <h1
          className="text-lg md:text-xl lg:text-[22px] font-bold mb-5 mt-2 text-center"
          style={theme.mode === "dark" ? themeStyle.logo : themeStyle.light}
        >
          Please Login
        </h1>
        <form
          action=""
          className="font-medium text-sm md:text-base lg:text-base flex flex-col"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email">Enter your Email or phone</label>
            <input
              type="text"
              name="emailPhone"
              onChange={handleInput}
              className="peer text-sm md:text-base lg:text-base py-1 block text-[#374151] my-2 rounded md:rounded-md lg:rounded-md w-full border-0  px-7 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:ring-rose-500"
            />
            <span className="text-rose-600 text-[14px]">
              {errorMessage.email}
            </span>
          </div>
          <div>
            <label htmlFor="password">Enter your password</label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              className="peer text-sm md:text-base lg:text-base py-1 block text-[#374151] my-2 rounded md:rounded-md lg:rounded-md w-full border-0  px-7 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:ring-rose-500"
            />
            <span className="text-rose-600 text-[14px]">
              {errorMessage.password}
            </span>
          </div>
          <p>
            <Link className="underline text-blue-500">Forgot Password?</Link>
          </p>
          <button className="w-full rounded-md bg-indigo-600 py-1.5 text-white cursor-pointer hover:ring-2 hover:ring-blue-500 hover:bg-white hover:text-black my-3">
            Login
          </button>
          <hr className="my-3 w-4/5 m-auto border border-gray-300" />

          <p className="mb-3">
            Are you a new user? Please {""}
            <Link to="/register" className="underline text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
