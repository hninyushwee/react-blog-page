import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";

function CreatePostsForm({
  postId,
  category,
  formValues,
  errorMessage,
  handleInput,
  handleSubmit,
}) {
  const { theme, themeStyle } = useTheme();
  return (
    <div
      style={
        theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
      }
      className="flex flex-col py-4 px-9 m-auto w-64 sm:w-[300px] md:w-[350px] lg:w-96 mt-5 border border-[#9ca3afa1] rounded shadow-lg"
    >
      <h1
        className="text-lg md:text-xl lg:text-[22px] font-bold mb-5 mt-2 text-center"
        style={theme.mode === "dark" ? themeStyle.logo : themeStyle.light}
      >
        Create New Post
      </h1>
      <form
        action=""
        className="group font-medium text-[13px] md:text-[14px] lg:text-[15px] flex flex-col"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label htmlFor="category">Choose Category</label>

          <select
            name="category"
            id="category"
            onChange={handleInput}
            value={formValues?.category?.id || formValues.category}
            required
            className="block text-[#374151] my-2 rounded md:rounded-md lg:rounded-md w-full border-0 text-grey-900 text-xs sm:text-sm md:text-base lg:text-base py-0.5 md:py-1 lg:py-1 px-7 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option disabled value={"default"}>
              Select One
            </option>
            {category.length > 0 &&
              category.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <span className="text-rose-600 text-[14px]">
            {errorMessage.category}
          </span>
        </div>
        <div>
          <label htmlFor="title">Enter Title</label>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleInput}
            placeholder="Title"
            required
            className="block text-[#374151] my-2 rounded md:rounded-md lg:rounded-md w-full border-0 text-grey-900 text-xs sm:text-sm md:text-base lg:text-base py-0.5 md:py-1 lg:py-1 px-7 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="text-rose-600 text-[14px]">
            {errorMessage.title}
          </span>
        </div>
        <div>
          <label htmlFor="image">Enter Image Url</label>
          <input
            type="text"
            name="image_url"
            placeholder="https://"
            value={formValues.image_url}
            onChange={handleInput}
            required
            className="block text-[#374151] my-2 rounded md:rounded-md lg:rounded-md w-full border-0 text-grey-900 text-xs sm:text-sm md:text-base lg:text-base py-0.5 md:py-1 lg:py-1 px-7 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="text-rose-600 text-[14px]">
            {errorMessage.image}
          </span>
        </div>

        <div>
          <label htmlFor="content">Enter Content</label>
          <textarea
            name="content"
            value={formValues.content}
            onChange={handleInput}
            placeholder="Context here..."
            required
            className="block text-[#374151] my-2 rounded md:rounded-md lg:rounded-md w-full h-20 md:h-24 lg:h-24 border-0 text-xs sm:text-sm md:text-base lg:text-base py-0.5 md:py-1 lg:py-1 px-7 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>
        <span className="text-rose-600 text-[14px]">
          {errorMessage.content}
        </span>
        {postId ? (
          <button className="w-full rounded-md bg-indigo-600 py-1.5 text-white cursor-pointer hover:ring-2 hover:ring-blue-500 hover:bg-white hover:text-black my-3">
            Edit Post
          </button>
        ) : (
          <button className="w-full rounded-md bg-indigo-600 py-1.5 text-white cursor-pointer hover:ring-2 hover:ring-blue-500 hover:bg-white hover:text-black my-3">
            Create Post
          </button>
        )}
      </form>
    </div>
  );
}

export default CreatePostsForm;
