import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

const Info = () => {
  const { info } = useSelector((state) => state.sg);
  if (!info) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  return (
    <div className="my-18">
      <div className="flex items-center justify-end px-8 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right   text-tertiary">
          حول الأمين العام
        </h3>
        <QuestionMarkCircleIcon className="text-sm w-5 text-tertiary" />
      </div>
      <div className=" w-[90%] lg:w-[70%] mx-auto text-lg break-words  border-[#5b5b5b] py-10 rounded-md shadow-lg text-tertiary text-center bg-gray-100">
        <p className="text-tertiary px-4 mb-10">{info.about}</p>
        <p className="text-tertiary px-4 mt-10">{info.about}</p>
      </div>
      <hr className="w-[80%] h-1 mx-auto my-20 bg-gray-300 border-0 rounded-sm  " />
    </div>
  );
};

export default Info;
