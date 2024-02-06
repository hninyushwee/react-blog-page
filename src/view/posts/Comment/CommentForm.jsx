import React, { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export const CommentForm = ({
  handleSubmit,
  initialText,
  submitLabel,
  hasCancelButton,
  handleCancel
}) => {
  const { theme, themeStyle } = useTheme();
  const [newComment, setNewComment] = useState(initialText || "");
  const disableButton = newComment.length === 0;
  // handle Comment Input
  const handleInput = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newComment);
    setNewComment("");
  };
  return (
    <div>
      <form className="flex flex-col " onSubmit={onSubmit}>
        <textarea
          value={newComment}
          onChange={handleInput}
          className="w-2/3 px-5 py-2 ml-10 h-20 rounded shadow-lg
               border-0 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none
              "
          style={
            theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
          }
          placeholder="Comments here"
        ></textarea>
        <div className="flex">
          <button
          type="submit"
          disabled={disableButton}
           className="disabled:bg-indigo-400 rounded-md mt-3 ml-10 self-start bg-indigo-600 px-2 py-1 text-white cursor-pointer hover:ring-2 hover:ring-blue-500 hover:bg-white hover:text-black">
            {submitLabel}
          </button>
          {hasCancelButton && (
            <button 
            type="submit"
            onClick={handleCancel}
            className="rounded-md mt-3 ml-2 flex items-center bg-red-600 px-2 py-1 text-white cursor-pointer hover:ring-2 hover:ring-red-500 hover:bg-white hover:text-black">
              Cancel 
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
