import React from "react";
import { MapPinIcon } from "@heroicons/react/20/solid";
import Post from "../../../../components/posts-componenets/Post";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

const PinedPost = () => {
  const { posts } = useSelector((state) => state.sg);

  if (!posts) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  return (
    <div className="my-16">
      <div className="flex items-center justify-end px-8 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right   text-tertiary">
          منشور مثبت
        </h3>
        <MapPinIcon className="text-sm w-5 text-tertiary" />
      </div>

      <Post post={posts.filter((post) => post.type === "Post")[0]} />

      <div className="flex items-center justify-end px-8 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right   text-tertiary">
          إعلان مثبت
        </h3>
        <MapPinIcon className="text-sm w-5 text-tertiary" />
      </div>

      <Post post={posts.filter((post) => post.type === "Ad")[0]} />
    </div>
  );
};

export default PinedPost;
