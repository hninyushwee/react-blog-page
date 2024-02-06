import React from "react";
import moment from "moment/moment";
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
function LatestPosts({ latestPosts }) {
  const { theme, themeStyle } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="w-100 border border-[#9ca3afa1] rounded-xl shadow-lg "
      style={
        theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
      }
    >
      <img
        src={latestPosts.image_url}
        alt="image"
        className="rounded-t-xl w-full h-28 sm:h-32 md:40 lg:h-48 object-cover"
      />
      <div className="mx-4">
        <div className="flex mt-3 justify-between">
          <p className="text-xs lg:text-sm my-auto px-3 py-1 rounded font-bold bg-[#fed7aa88]">
            {latestPosts.category?.name}
          </p>
          <p className="text-xs lg:text-sm text-gray-500">
            {moment(latestPosts.created_at).format("l")}
          </p>
        </div>
        <h2 className="font-bold  py-2">{latestPosts.title}</h2>

        <p className="indent-3.5 break-word h-[80px] lg:h-[100px] overflow-hidden">
          {latestPosts.content}
        </p>
        <div className="flex justify-between items-center mb-5 mt-2">
          <p className="text-gray-500 text-[11px] lg:text-[13px]">
            Power By {latestPosts?.user?.name}
          </p>
          <button
            onClick={() => navigate(`/post_details/${latestPosts.id}`)}
            style={
              theme.mode === "dark"
                ? themeStyle.button.dark
                : themeStyle.button.light
            }
            className="text-xs lg:text-sm rounded-md h-8 bg-amber-800 mt-1 px-2 py-1 text-white border border-amber-800 border-y-amber-800 cursor-pointer hover:bg-amber-950 shadow-lg"
          >
            More&nbsp;&gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default LatestPosts;
