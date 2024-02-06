import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LatestPosts from "./LatestPosts";
import AllPosts from "./AllPosts";
import { useTheme } from "../../../contexts/ThemeContext";
import Pagination from "./Pagination";
import { useApiData } from "../../../contexts/ApiDataContext";
import { Loading } from "../../../Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostLists() {
  const location = useLocation();
  const { theme, themeStyle } = useTheme();
  const { category } = useApiData();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filterItem, setFilterItem] = useState("default");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  // get state from navigation
  const deleteId = "delete";
  useEffect(() => {
    if (!loading) {
      const success =
        location.state &&
        (location.state.deleteSuccess ||
          location.state.createSuccess ||
          location.state.loginSuccess);
      const hasToastSuccess = localStorage.getItem("SuccessToast");
      if (hasToastSuccess === "false" && success) {
        toast.success(success, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          toastId: deleteId,
          autoClose: 3000,
        });
        localStorage.setItem("SuccessToast", "true");
      }
    }
  }, [location.state, loading]);
  // get post data from api and related category and user
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/posts?_expand=category&_expand=user`
      )
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  // filter latest 6 post
  let latestPosts = [];
  if (posts.length > 0) {
    latestPosts = [...posts]
      .sort((start, end) => (start.created_at > end.created_at ? -1 : 1))
      .slice(0, 6);
  }
  // Search Post
  const searchAndFilter = posts
    .filter(
      (post) =>
        (searchItem !== "" && post.title.includes(searchItem)) ||
        (filterItem !== "default" && post.categoryId == filterItem)
    )
    .sort((start, end) => (start.created_at > end.created_at ? -1 : 1));

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  //to show 10 posts data at 1 page
  const recordPerPage = 10;
  // last index for current page
  const lastIndex = currentPage * recordPerPage;
  //first index for current page
  const fristIndex = lastIndex - recordPerPage;
  //records for current page
  const records = posts.slice(fristIndex, lastIndex);
  //total page
  const totalPage = Math.ceil(posts.length / recordPerPage);
  // page number
  const number = [...Array(totalPage + 1).keys()].slice(1);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <ToastContainer />
      <div
        className="pb-5"
        style={theme.mode === "dark" ? themeStyle.main : themeStyle.light}
      >
        <div
          className="h-28 sm:h-36 md:h-40 lg:h-44 text-center shadow-lg  sm:pt-3 md:pt-4 lg:pt-5 "
          style={
            theme.mode === "dark"
              ? themeStyle.home.card1.dark
              : themeStyle.home.card1.light
          }
        >
          <div className="flex justify-center pt-8 mb-2 sm:mb-3 md:mb-3 lg:mb-3">
            <input
              type="text"
              placeholder="Search"
              name="search"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              style={
                theme.mode === "dark" ? themeStyle.input.dark : themeStyle.light
              }
              className="text-[#374151] text-sm md:text-base lg:text-base py-1 px-3 rounded md:rounded-md lg:rounded-md border border-amber-800 border-y-amber-800 focus:outline-none shadow-lg"
            />
          </div>
          <select
            value={filterItem}
            onChange={(e) => setFilterItem(e.target.value)}
            name=""
            id=""
            className="text-[#374151] text-sm md:text-base lg:text-base py-1 px-3 rounded md:rounded-md lg:rounded-md border border-amber-800 border-y-amber-800 focus:outline-none shadow-lg"
          >
            <option value={"default"} disabled>
              Filter By
            </option>
            {category.length > 0 &&
              category.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        {searchItem !== "" || filterItem !== "default" ? (
          <div className="h-[600]">
            <h1 className="text-2xl font-bold px-10 py-5">All Posts</h1>
            <div className="flex flex-col gap-8 m-auto w-4/5 ">
              {searchAndFilter.map((post) => (
                <AllPosts key={post.id} allPosts={post} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h1 className="text-lg md:text-xl lg:text-[22px] font-bold px-10 py-5">
                Latest Posts
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-5 lg:gap-8 px-24 sm:px-20 md:px-12 lg:px-20">
                {latestPosts.length > 0 &&
                  latestPosts.map((latestPost) => (
                    <LatestPosts key={latestPost.id} latestPosts={latestPost} />
                  ))}
              </div>
            </div>
            <div className="h-[600]">
              <h1 className="text-lg md:text-xl lg:text-[22px] font-bold px-10 py-5">
                All Posts
              </h1>
              <div className="flex flex-col gap-4 m-auto w-11/12 sm:w-5/6 md:w-4/5 lg:4/5 ">
                {records.length > 0 &&
                  records.map((post) => (
                    <AllPosts key={post.id} allPosts={post} />
                  ))}
              </div>
              {/* Paginate Page */}
              <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                number={number}
                totalPage={totalPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostLists;
