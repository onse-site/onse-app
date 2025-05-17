import React from "react";
import { QueueListIcon } from "@heroicons/react/20/solid";
import Post from "../../../../components/posts-componenets/Post";
import { useSelector } from "react-redux";

// content
export const Content = () => {
  const { posts } = useSelector((state) => state.sg);

  return (
    <div>
      <div className="flex items-center justify-end px-8 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right text-tertiary">
          إعلانات و منشورات
        </h3>
        <QueueListIcon className="text-sm w-5 text-tertiary" />
      </div>

      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

// posts
export const Posts = ({ child = null }) => {
  const { posts } = useSelector((state) => state.sg);

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
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
};

export const Ads = () => {
  const { posts } = useSelector((state) => state.sg);

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
