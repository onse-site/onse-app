import React from "react";

const Banner = ({ child = null }) => {
  return (
    <div
      id="sticky-banner"
      tabIndex="-1"
      className="hidden lg:flex w-[95%] md:w-[80%] start-0 z-12 mt-8 mx-auto rounded-lg  justify-between p-4 border-b border-gray-200 bg-gray-100 "
    >
      <div className="flex items-center">
        <button
          data-dismiss-target="#sticky-banner"
          type="button"
          className="shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  "
          onClick={() => {
            document.getElementById("sticky-banner").style.display = "none";
          }}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close banner</span>
        </button>
      </div>
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-md font-normal text-gray-900 ">
          <span className="flex items-center gap-x-5">
            {" "}
            {child} لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
