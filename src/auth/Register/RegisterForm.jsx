import React from "react";

function RegisterForm(props) {
  const { label, errorMessage, handleInput, ...inputProps } = props;
  return (
    <div>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={handleInput}
        className="peer text-sm md:text-base lg:text-base py-1 block text-[#374151] my-2 rounded md:rounded-md lg:rounded-md w-full border-0  px-7 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:ring-rose-500"
      />
      <span className="text-rose-600 text-[14px] hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
        {errorMessage}
      </span>
    </div>
  );
}

export default RegisterForm;
