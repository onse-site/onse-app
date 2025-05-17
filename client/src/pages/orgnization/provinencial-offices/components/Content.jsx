/* eslint-disable no-unused-vars */
import React, { useActionState, useState } from "react";
import Member from "./Member";
import Carousel from "../../../../utils/Carousel";
import AddPost from "../../../../components/posts-componenets/AddPost";
import { Posts } from "../../../../components/posts-componenets/Posts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import { SmartSkeleton } from "@ela-labs/smart-skeleton-react";

const Content = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  const { members, posts } = useSelector((state) => state.po);

  /* if (!members) {
    return (
      <div className="flex w-full items-center justify-center h-[calc(100vh_-_320px)] my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  } */

  if (!posts || !members) {
    return (
      <div className="flex w-[80%] items-center justify-center h-[calc(100vh_-_43rem)] my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[82.5%] my-4">
      <div className="lg:p-4 ">
        <div className="lg:p-4 lg:border-2 lg:border-gray-500 lg:border-dashed rounded-lg ">
          <div className="block lg:hidden">
            <Carousel Element={Member} Items={members} />
          </div>

          <div className="lg:flex hidden items-center overflow-x-auto scrollbar-hidden justify-center my-4 gap-x-4 overflow-hidden">
            {members?.map((member, index) => {
              return <Member key={index} props={member} />;
            })}
          </div>

          <hr className="w-[80%] my-4 h-1 mx-auto rounded-lg bg-[#5b5b5b]" />

          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setOpenAdd(!openAdd);
              }}
              className="w-[80%] bg-gray-200 text-tertiary px-6 py-2 rounded-lg"
            >
              إضافة منشور
            </button>
          </div>

          {openAdd && <AddPost />}

          <hr className="w-[80%] my-4 h-1 mx-auto rounded-lg bg-[#5b5b5b]" />

          <Posts posts={posts} />

          <hr className="w-[80%] my-4 h-1 mx-auto rounded-lg bg-[#5b5b5b]" />
        </div>
      </div>
    </div>
  );
};

export default Content;
