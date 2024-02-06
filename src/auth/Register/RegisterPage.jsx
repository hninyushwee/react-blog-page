import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./RegisterForm";
import { useTheme } from "../../contexts/ThemeContext";
import { useApiData } from "../../contexts/ApiDataContext";

function RegisterPage() {
  const { theme, themeStyle } = useTheme();
  const { allUsers, setAllUsers } = useApiData();
  const navigator = useNavigate();
  const initial = {
    name: "",
    phone: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  };
  const [inputValues, setInputValues] = useState(initial);
  // declare html attribute
  const attribute = [
    {
      id: 1,
      type: "text",
      name: "name",
      placeholder: "Jhon",
      label: "Enter Your Name",
      errorMessage: "Name is required",
      required: true,
    },
    {
      id: 2,
      type: "text",
      name: "phone",
      placeholder: "09404585623",
      label: "Enter Your Phone Number",
      errorMessage: "Your Phone should at most 11",
      required: true,
      pattern: "[0-9]{11}",
    },
    {
      id: 3,
      type: "email",
      name: "email",
      placeholder: "jhon@example.com",
      label: "Enter Your Email",
      errorMessage: "Your email is invalid format",
      required: true,
    },
    {
      id: 4,
      type: "text",
      name: "image",
      placeholder: "https?://.....",
      label: "Enter Your Profile Image",
      errorMessage: "Your profile image should start https?://",
      required: true,
      pattern: "https?://.+",
    },
    {
      id: 5,
      type: "password",
      name: "password",
      placeholder: "at least 8 characters",
      label: "Enter Your Password",
      errorMessage:
        "Password should be 8-16 characters and include at least 1 letter, 1 number, and 1 special characters",
      required: true,
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
    },
    {
      id: 6,
      type: "password",
      name: "confirmPassword",
      placeholder: "confirm password",
      label: "Enter Your Confirm Password",
      errorMessage: "Password is not match",
      required: true,
      pattern: inputValues.password,
    },
  ];

  // post register data
  const postData = async (users) => {
    // if email or phone has already exit, show error and if new email and phone, store data to json-server
    const filterEmail = users.filter(
      (user) =>
        user.email === inputValues.email || user.phone === inputValues.phone
    );
    if (filterEmail.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(inputValues.password, salt);

      const userData = {
        name: inputValues.name,
        phone: inputValues.phone,
        email: inputValues.email,
        image: inputValues.image,
        password: hashPassword,
      };
      // post input form data to api
      await axios
        .post(`${import.meta.env.VITE_API_URL}/users`, userData)
        .then((res) => {
          setAllUsers([...allUsers, res.data]);
          navigator("/login");
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
        });
    } else {
      toast.error("Email or Phone has been already exit!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 3000

      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postData(allUsers);
  };
  //set form data to state value
  const handleInput = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  console.log(allUsers);
  return (
    <div className="pb-5">
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
          Please Register
        </h1>
        <form
          action=""
          className="group font-medium text-sm md:text-base lg:text-base flex flex-col"
          onSubmit={handleSubmit}
        >
          {attribute.map((input) => (
            <RegisterForm
              key={input.id}
              {...input}
              value={inputValues[attribute.name]}
              handleInput={handleInput}
            />
          ))}
          <button className="group-invalid:pointer-events-none group-invalid:opacity-80 w-full rounded-md bg-indigo-600 py-1.5 text-white cursor-pointer hover:ring-2 hover:ring-blue-500 hover:bg-white hover:text-black my-3">
            Register
          </button>
          <hr className="my-3 w-4/5 m-auto border border-gray-300" />
          <p className="mb-3">
            Do you have already account?{" "}
            <Link to="/login" className="underline text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
