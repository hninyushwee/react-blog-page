import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function EditPost({postId}) {
  return (
      <Link to={`/edit_posts/${postId}`} className="flex items-center cursor-pointer">
        <PencilSquareIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6  text-green-600" />
        <span className="text-xs md:text-sm lg:text-sm text-gray-500">Edit</span>
      </Link>
  );
}

export default EditPost;
