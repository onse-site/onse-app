/* eslint-disable no-unused-vars */
import React, { Children } from "react";
import { useState } from "react";
import { QueueListIcon } from "@heroicons/react/20/solid";
import Post from "./Post";

// posts
export const Posts = ({ child = null, posts }) => {
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

      {posts?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

// ads
export const Ads = ({ ads }) => {
  return (
    <div className="">
      <div className="flex items-center justify-end px-8 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right   text-tertiary">
          إعلانات
        </h3>
        <QueueListIcon className="text-sm w-5 text-tertiary" />
      </div>

      {ads?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
