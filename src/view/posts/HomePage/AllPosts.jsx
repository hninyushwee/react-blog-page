import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
function AllPosts({ allPosts }) {
  const { theme, themeStyle } = useTheme();
  const navigate = useNavigate();
  return (
    <div
      className="h-32 sm:h-44 md:h-48 lg:h-52 flex flex-row border border-[#9ca3afa1] shadow-lg "
      style={
        theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
      }
    >
      <img
        src={allPosts.image_url}
        alt="image"
        className="rounded-l-xl p-2.5 sm:p-3 md:p-4 lg:p-4 w-32 sm:w-44 md:w-48 lg:w-52 object-cover"
      />
      <div className=" mx-2 sm:my-3 md:mx-3.5 md:my-4 lg:mx-4 lg:my-5 w-8/12">
        <div className="flex mt-3 justify-between">
          <p className="text-xs lg:text-sm my-auto px-3 py-1 rounded font-bold bg-[#cbd5e163]">
            {allPosts.category?.name}
          </p>

          <p className="text-xs lg:text-sm text-gray-500">
            {moment(allPosts.created_at).format("l")}
          </p>
        </div>
        <h2 className="font-bold py-1 sm:py-2 md:py-2 lg:py-2">{allPosts.title}</h2>

        <p className="indent-3.5 break-word h-8 sm:h-10 md:h-10 lg:h-12 overflow-hidden">
          {allPosts.content}
        </p>
        <div className="flex justify-between items-center mt-0.5 sm:mt-2 md:mt-2 lg:mt-2">
          <p className="text-gray-500  text-[12px] lg:text-[13px]">
            Power By {allPosts?.user?.name}
          </p>
          <button
            onClick={() => navigate(`/post_details/${allPosts.id}`)}
            style={
              theme.mode === "dark"
                ? themeStyle.button.dark
                : themeStyle.button.light
            }
            className="text-xs lg:text-sm rounded-md bg-amber-800 lg:mt-1 px-2.5 py-1 lg:py-1.5 text-white border border-amber-800 border-y-amber-800 cursor-pointer hover:bg-amber-950 shadow-lg"
          >
            More&nbsp;&gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
