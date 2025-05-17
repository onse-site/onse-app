import React from "react";
import { useNotification } from "../../hooks/Notification";

export default function Hero() {
  const { showNotification } = useNotification();
  return (
    <div className="bg-white ">
      <div className="relative isolate px-6 pt-4 lg:px-8" id="start">
        <div className="mx-auto max-w-2xl py-30 sm:py-30 lg:py-34">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight lg:text-nowrap text-center text-gray-900 sm:text-7xl flex align-center justify-center  ">
              المنظمة الوطنية للتضامن الطلابي
            </h1>
            <div className="mb-8 lg:mb-0 sm:flex sm:justify-center">
              <div className="relative my-10 text-center rounded-full px-3 py-1 text-lg text-[#4d80e4]  font-bold   w-auto lg:min-w-[300px]">
                <pre>وحدة - علم - عمل </pre>
              </div>
            </div>
            <p className="mt-3 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة
              وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس
              تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => {
                  showNotification(" المنظمة الوطنية للتضامن الطلابي", "green");
                }}
                className="text-sm/6 font-semibold text-[#4d80e4]"
              >
                تصفح المحتوى <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        ></div>
      </div>
    </div>
  );
}
