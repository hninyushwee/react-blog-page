import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeletePost({ postId }) {
  const navigate = useNavigate();
  const deletePost = async () => {
    if (window.confirm("Are you sure to delete this post")) {
      // delete post
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`
      );
      //after post delete success, go to home page
      localStorage.setItem("SuccessToast", "false");
      navigate("/", { state: { deleteSuccess: "Delete Post Successful" } });
    }
  };
  return (
    <div className="flex items-center cursor-pointer">
      <TrashIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-red-600" onClick={deletePost} />
      <span className="text-xs md:text-sm lg:text-sm text-gray-500" onClick={deletePost}>
        Delete
      </span>
    </div>
  );
}

export default DeletePost;
