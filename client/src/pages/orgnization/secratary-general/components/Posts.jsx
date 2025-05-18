import React from "react";
import { QueueListIcon } from "@heroicons/react/20/solid";
import Post from "../../../../components/posts-componenets/Post";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

// content
export const Content = () => {
  const { posts } = useSelector((state) => state.sg);

  if (!posts) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <h3 className="text-3xl font-bold text-right text-tertiary">
          لا توجد منشورات
        </h3>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-end px-8 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right text-tertiary">
          إعلانات و منشورات
        </h3>
        <QueueListIcon className="text-sm w-5 text-tertiary" />
      </div>

      {posts && posts.map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
};

// posts
export const Posts = ({ child = null }) => {
  const { posts } = useSelector((state) => state.sg);

  if (!posts) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <h3 className="text-3xl font-bold text-right text-tertiary">
          لا توجد منشورات
        </h3>
      </div>
    );
  }
  return (
    <div className="">
      <div
        className={`flex items-center ${
          child ? "justify-between" : "justify-end"
        } px-8 py-10 gap-x-2 bg-white`}
      >
        <h3 className="text-3xl font-bold text-right   text-tertiary">
          منشورات
        </h3>
        {child && <div>{child}</div>}
        <QueueListIcon className="text-sm w-5 text-tertiary" />
      </div>

      {posts
        .filter((post) => post.type === "Post")
        .map((post, index) => (
          <Post key={index} post={post} />
        ))}
    </div>
  );
};

export const Ads = () => {
  const { posts } = useSelector((state) => state.sg);

  if (!posts) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <h3 className="text-3xl font-bold text-right text-tertiary">
          لا توجد منشورات
        </h3>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex items-center justify-end px-8 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right   text-tertiary">
          إعلانات
        </h3>
        <QueueListIcon className="text-sm w-5 text-tertiary" />
      </div>

      {posts
        .filter((post) => post.type === "Ad")
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
};
