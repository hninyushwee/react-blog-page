import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
function Pagination({ setCurrentPage, currentPage, number, totalPage }) {
  const { localUserData } = useAuth();

  const previousPage = () => {
    if (localUserData) {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      toast.warn("Please Login First!!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };
  const nextPage = () => {
    if (localUserData) {
      if (currentPage !== totalPage) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      toast.warn("Please Login First!!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };
  const changePage = (id) => {
    if (localUserData) {
      setCurrentPage(id);
    } else {
      toast.warn("Please Login First!!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };
  return (
    <div className="flex justify-center mt-4">
      <ToastContainer />
      <div>
        <button
          className="rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:bg-indigo-600 focus:text-white"
          onClick={previousPage}
        >
          <ChevronLeftIcon className="h-3 w-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:h-5 lg:w-5" />
        </button>
      </div>
      <div>
        {number.map((n, i) => (
          <button
            className="px-2.5 py-1.5 px-3 py-1.5 md:px-4 md:py-2 lg:px-4 lg:py-2 text-sm font-semibold focus:z-20 ring-1 ring-inset ring-gray-300 focus:bg-indigo-600 focus:text-white"
            onClick={() => changePage(n)}
            key={i}
          >
            {n}
          </button>
        ))}
      </div>
      <div>
        <button
          className="rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:bg-indigo-600 focus:text-white "
          onClick={nextPage}
        >
          <ChevronRightIcon className="h-3 w-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:h-5 lg:w-5" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
