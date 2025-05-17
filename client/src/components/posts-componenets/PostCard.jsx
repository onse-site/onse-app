import React from "react";
import { useRef } from "react";
const PostCard = ({ post }) => {
  const infoRef = useRef(null);

  const handleMouseEnter = () => {
    if (infoRef.current) {
      infoRef.current.style.opacity = "1";
      infoRef.current.style.transform = "translateY(0)";
    }
  };

  const handleMouseLeave = () => {
    if (infoRef.current) {
      infoRef.current.style.opacity = "0";
      infoRef.current.style.transform = "translateY(10rem)";
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-end w-[16rem] lg:w-[20rem] h-[360px] p-6 m-2 bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-400 ease-out hover:translate-y-5 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-0 before:transition-opacity before:duration-500 before:rounded-xl before:z-2 hover:before:opacity-50 border-2 border-[#5b5b5b]`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <img
        src={post.image}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover rounded-xl  outline-none ring-0 ${
          post.image !== "b"
            ? ""
            : "bg-gradient-to-r from-gray-300 via-gray-200 to-white animate-pulse  overflow-hidden"
        } `}
      />

      {/* Info Content */}
      <div
        ref={infoRef}
        className="relative z-30  opacity-0 translate-y-1 transition-all duration-500 ease-in-out text-right "
      >
        <h1 className="lg:text-2xl font-bold m-0 text-tertiary lg:text-white">
          {post.title}
        </h1>
        <p className="text-sm tracking-wide mt-2 mb-2 text-tertiary lg:text-[white]">
          {post.content}
        </p>
        <button className="px-4 py-1 mt-2 font-bold text-white bg-[#4d80e4] rounded-md transition-colors duration-500 hover:bg-[#4D80E4] hover:text-white">
          المزيد
        </button>
      </div>
    </div>
  );
};

export default PostCard;
