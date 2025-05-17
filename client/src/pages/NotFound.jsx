import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="w-full lg:h-[calc(100vh-23.01rem)] h-[calc(100vh-17.01rem)] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full fixed top-0 left-0 z-11 lg:h-[10rem] h-[6rem]  bg-gradient-to-b from-[#4d80e4] to-[#ffffff]"></div>
      <div className="text-center lg:h-[17.75rem] h-[19.5rem]  ">
        <p className="text-3xl font-bold text-[#4d80e4]">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          الصفحة غير موجودة
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-[#4d80e4] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#4d80e4] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
