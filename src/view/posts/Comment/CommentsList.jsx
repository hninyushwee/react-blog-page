import React, { useEffect, useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { CommentForm } from "./CommentForm";
import axios from "axios";
export const CommentsList = ({
  commentUserId,
  comment,
  userId,
  activeComment,
  setActiveComment,
  editComment,
  deleteComment,
}) => {
  const { theme, themeStyle } = useTheme();
  const [user, setUser] = useState();
  const isEditing = activeComment === comment.id;
  // get comment's user details
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${commentUserId}`)
      .then((res) => setUser(res.data));
  }, [commentUserId]);
  return (
    <div className="mb-3">
      <div className="flex items-center">
        <img
          src={user?.image}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full object-conver"
          alt="image"
        />
        <span className="pl-2 text-sm font-bold">{user?.name}</span>
      </div>
      <div
        className="w-2/3 ml-10 rounded-bl-3xl rounded-e-lg border border-[#9ca3af44] shadow-md"
        style={
          theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
        }
      >
        {!isEditing && (
          <p className="py-2 px-6 break-word">{comment.comment}</p>
        )}
      </div>
      {isEditing && (
        <CommentForm
          initialText={comment.comment}
          submitLabel="Update"
          hasCancelButton
          handleSubmit={(updateComment) =>
            editComment(updateComment, comment.id)
          }
          handleCancel={() => setActiveComment(null)}
        />
      )}

      {userId && userId === user?.id && (
        <div className="flex ml-16 mt-1 text-xs space-x-2 underline text-gray-500 cursor-pointer">
          <p onClick={() => setActiveComment(comment?.id)}>Edit</p>
          <p onClick={() => deleteComment(comment?.id)}>Delete</p>
        </div>
      )}
    </div>
  );
};
