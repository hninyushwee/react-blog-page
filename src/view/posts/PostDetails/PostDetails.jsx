import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useTheme } from "../../../contexts/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatBubbleOvalLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useAuth } from "../../../contexts/AuthContext";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import CommentPage from "../Comment/CommentPage";

function PostDetails() {
  const { id } = useParams();
  const { theme, themeStyle } = useTheme();
  const { localUserData } = useAuth();
  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const [commentCount, setCommentCount] = useState(0);
  const [likeStatus, setLikeStatus] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isClick, setIsClick] = useState(false);

  // get post details
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${id}?_expand=user`)
      .then((res) => {
        setDetails(res.data);
        setLikeStatus(res.data.likeStatus);
        setLikeCount(res.data.likeStatus.length);
      })
      .catch((err) => console.log(err));
  }, []);

  const hadLike = likeStatus.filter((like) => like.userId === localUserData);

  //add like
  const addLike = async () => {
    const like = {
      likeStatus: [...likeStatus, { userId: localUserData }],
    };
    const add = await axios
      .patch(`${import.meta.env.VITE_API_URL}/posts/${id}`, like)
      .catch((err) => console.log(err));
    if (add.statusText === "OK") {
      setLikeStatus(add.data.likeStatus);
      setLikeCount(likeCount + 1);
    }
  };
  // remove like
  const removeLike = async () => {
    const deleteLike = likeStatus.filter(
      (like) => like.userId !== localUserData
    );
    const remove = await axios
      .patch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        likeStatus: deleteLike,
      })
      .catch((err) => console.log(err));

    if (remove.statusText === "OK") {
      setLikeStatus(remove.data.likeStatus);
      setLikeCount(likeCount - 1);
    }
  };
  // handle like button
  const handleLike = () => {
    if (localUserData) {
      if (!isClick && hadLike.length === 0) {
        addLike();
      } else if (isClick && hadLike.length > 0) {
        removeLike();
      }
      setIsClick(!isClick);
    } else {
      toast.warn("Please Login First!!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="w-4/5  mt-8 rounded m-auto border border-[#9ca3af44] shadow-lg"
        style={
          theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
        }
      >
        <div>
          <div className="flex pl-7 pt-5 sm:pl-8 sm:pt-6 md:pl-9 md:pt-7 lg:pl-10 lg:pt-8 ">
            <img
              src={details?.user?.image}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full object-conver"
              alt="image"
            />
            <div>
              <span className="pl-4 font-bold text-xs md:text-sm lg:text-base">
                {details?.user?.name}
              </span>
              <p className="pl-4 text-xs md:text-sm lg:text-sm text-gray-500">
                {" "}
                {moment(details?.created_at).format("l")}
              </p>
            </div>
          </div>
        </div>
        <div className="px-8 sm:px-12 md:px-16 lg:px-20">
          <h1 className="text-base sm:text-lg md:text-lg lg:text-xl flex-none mt-8 font-bold">
            {details?.title}
          </h1>
          <img
            src={details?.image_url}
            alt="image"
            className="m-auto my-6 w-60 h-40 sm:w-64 sm:h-44 md:w-72 md:h-48 lg:w-80 lg:h-52 object-cover"
          />
          <p className="indent-16">{details?.content}</p>
        </div>
        <div className="flex justify-between px-10 py-5">
          <div className="flex space-x-3">
            {isClick && hadLike.length > 0 ? (
              <div className="flex items-center">
                <HeartIconSolid
                  onClick={handleLike}
                  className="text-rose-600 w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5"
                />
                <span className="text-gray-500 select-none">{likeCount}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <HeartIconOutline
                  onClick={handleLike}
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5"
                />
                <span className="text-gray-500 select-none">{likeCount}</span>
              </div>
            )}

            <div className="flex items-center">
              <ChatBubbleOvalLeftIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5" />
              <span className="text-gray-500 select-none">{commentCount}</span>
            </div>
          </div>
          {localUserData && localUserData === details?.user.id && (
            <div className="select-none flex space-x-3">
              {/* To Edit Post */}
              <EditPost postId={id} />
              {/* To delete Post */}
              <DeletePost postId={id} />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        style={
          theme.mode === "dark"
            ? themeStyle.button.dark
            : themeStyle.button.light
        }
        className="select-none ml-16 sm:ml-24 md:ml-28 lg:ml-32 mt-4 rounded-md h-8 bg-amber-800 px-2 py-1 text-white border border-amber-800 border-y-amber-800 cursor-pointer hover:bg-amber-950 shadow-lg"
      >
        &lt;&lt;Back
      </button>

      <div className="w-4/5 rounded m-auto">
        <h1 className="text-lg md:text-xl select-none lg:text-[22px] flex-none  ml-4 my-4 font-bold">
          Comments
        </h1>
        <div className="pl-7 sm:pl-8 md:pl-9 lg:pl-10 ">
          {/* Show Comment */}
          <CommentPage postId={details?.id} setCommentCount={setCommentCount} />
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
