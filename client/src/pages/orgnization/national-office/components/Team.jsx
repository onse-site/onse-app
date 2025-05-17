/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import Member from "./Member";
import Carousel from "../../../../utils/Carousel";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
const Team = () => {
  const { members, posts } = useSelector((state) => state.no);

  if (!members) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-tertiary ">
              أعضاء المكتب الوطني
            </h2>
            <p className="font-light text-gray-500 sm:text-xl ">
              نحن هنا لدعمكم ومساعدتكم في كل ما تحتاجونه. إذا كان لديك أي
              استفسارات أو تحتاج إلى المساعدة، فلا تتردد في التواصل معنا.
            </p>
          </div>

          <div className="hidden lg:grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {members.map((member, index) => (
              <Member key={index} props={member} />
            ))}
          </div>

          <div className="block lg:hidden">
            <Carousel Element={Member} Items={members} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
