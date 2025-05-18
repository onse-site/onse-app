/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import {
  HeartIcon,
  ShareIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const { member, status } = useSelector((state) => state.auth);

  const toggleLike = () => {
    setLiked(!liked);
  };
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const displayContent =
    post.content && post.content.length > 250 && !showFullContent
      ? `${post.content.substring(0, 250)}`
      : post.content;

  return (
    <div className=" w-[90%] md:w-[60%] mx-auto   bg-white border border-gray-200 rounded-lg shadow-sm my-4">
      <div className="w-full h-20 flex items-center justify-end px-4 gap-4">
        {status === "succeeded" &&
          member?._id &&
          post?.author?.id &&
          String(member._id) === String(post.author.id) && (
            <Link
              to={`/organization/edit-post/${post.id}`}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <PencilSquareIcon className="w-6 h-6" />
            </Link>
          )}
        <div className="w-full h-20 flex items-center justify-end px-2 gap-4">
          <div className="flex flex-col items-end justify-center gap-x-2">
            <h2 className="text-tertiary font-bold flex flex-col items-end justify-center">
              {post.author.role == "SG"
                ? post.author.name
                : post.author.office.name}
              <br />
              <span className="text-xs py-1">
                <span className="text-gray-700 text-xs ">
                  {formatDistanceToNow(new Date(post.publishedAt), {
                    addSuffix: true,
                  })}
                </span>
                <span className="px-2">-</span>
                <span> {post.author.role == "SG" ? "" : post.author.name}</span>
              </span>
            </h2>
          </div>
          <img
            src={
              post.author.role == "SG"
                ? post.author.avatar
                : post.author.office.cover
            }
            alt=""
            className={` w-14 h-14 rounded-full border-2 border-[#5b5b5b]  ${
              post.author !== "b"
                ? ""
                : "bg-gradient-to-r from-gray-300 via-gray-200 to-white animate-pulse  overflow-hidden"
            } `}
          />
        </div>
      </div>

      <Link className="h-20" href="#">
        <img
          className={` object-cover w-full h-[15rem] lg:h-[30rem] shadow-2xl  border-1 border-[#5b5b5b] outline-none ring-0   ${
            post.image !== null
              ? ""
              : "bg-gradient-to-r from-gray-300 via-gray-200 to-white animate-pulse  overflow-hidden"
          }`}
          src={post.image}
          alt=""
        />
      </Link>

      <div className="p-5">
        <Link href="#">
          <h5 className="m-4 break-words text-2xl font-bold tracking-tight text-tertiary text-right ">
            {post.title}
          </h5>
        </Link>
        <p
          className="  break-words  font-normal text-gray-700 text-right"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        ></p>
        {post.content && post.content.length > 250 && (
          <button
            onClick={toggleContent}
            className=" px-2 text-blue-400 w-full flex  items-center justify-end cursor-pointer"
          >
            {showFullContent ? "عرض أقل" : "عرض المزيد"}
          </button>
        )}
      </div>

      <div className="flex justify-between gap-x-4 p-5">
        <span
          className={`inline-flex items-center rounded-md  px-4 py-1 text-xs font-medium ${
            post.type == "Ad"
              ? "text-red-600 bg-red-50"
              : "text-blue-600 bg-blue-50"
          } ring-1 ring-gray-500/10 ring-inset`}
        >
          {post.type == "Ad" ? "إعلان" : "منشور"}
        </span>
        <div className="flex items-center justify-center gap-x-2">
          <button>
            <ShareIcon className="lg:w-8 w-6 lg:h-8 h-6 text-gray-400 " />
          </button>
          <button onClick={toggleLike}>
            <HeartIcon
              className={`lg:w-8 w-6 lg:h-8 h-6 ${
                liked ? "text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
