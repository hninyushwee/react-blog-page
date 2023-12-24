import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Loading";
function UserPostLists() {
  const { theme, themeStyle } = useTheme();
  const { localUserData } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/posts?userId=${localUserData}&_expand=category&_expand=user`
      )
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mt-12 mb-5">
      {posts.length === 0 ? (
        <div className="mt-16 font-bold">
          <h1 className="text-center text-2xl">
            You have not created any post
          </h1>
          <div className="text-center mt-8">
            <p className="italic font-bold">
              Do you want to create post? Click below
            </p>
            <button
              onClick={() => navigate("/create_posts")}
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-5"
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="sm:h-44 md:h-48 lg:h-52 w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 m-auto mt-4 flex flex-col sm:flex-row md:flex-row lg:flex-row border border-[#9ca3afa1] shadow-lg "
            style={
              theme.mode === "dark"
                ? themeStyle.card.dark
                : themeStyle.card.light
            }
          >
            <img
              src={post.image_url}
              alt="image"
              className="rounded-l-xl sm:p-2 md:p-2.5 lg:p-3 w-full sm:w-32 md:w-44 lg:w-48 h-44 sm:h-full md:h-full lg:h-full object-cover"
            />
            <div className="mx-4 sm:my-3 md:mx-3.5 md:my-4 lg:mx-4 lg:my-5 sm:w-8/12 md:w-8/12 lg:w-8/12">
              <div className="flex mt-3 justify-between">
                <p className="text-xs lg:text-sm  my-auto px-3 py-1 rounded font-bold bg-[#cbd5e163]">
                  {post.category?.name}
                </p>

                <p className="text-xs lg:text-sm text-gray-500">
                  {moment(post.created_at).format("l")}
                </p>
              </div>
              <h2 className="font-bold text-xs md:text-sm lg:text-sm py-2 md:py-2 lg:py-2">{post.title}</h2>

              <p className="indent-3.5 break-word h-8 sm:h-10 md:h-10 lg:h-12 overflow-hidden">
                {post.content}
              </p>
              <div className="flex justify-between items-center mb-5 sm:mb-0 md:mb-0 lg:mb-0 mt-2.5 md:mt-3 lg:mt-3">
                <p className="text-gray-500 text-[12px] lg:text-[13px]">
                  Power By {post.user?.name}
                </p>
                <button
                  onClick={() => navigate(`/post_details/${post.id}`)}
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
        ))
      )}
    </div>
  );
}

export default UserPostLists;
