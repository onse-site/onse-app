import React from "react";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

const SecretairContactInfo = () => {
  const { info } = useSelector((state) => state.sg);

  if (!info) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  return (
    <div className="bg-gray-100 my-30  w-[95%] border border-gray-300 rounded-lg px-2 py-8 max-w-3xl mx-auto shadow-lg text-right font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          معلومات الاتصال بالأمين العام
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          هنا يمكنك العثور على معلومات الاتصال الخاصة بالأمين العام. إذا كنت
          بحاجة إلى أي مساعدة أو لديك استفسارات، فلا تتردد في التواصل معنا.
        </p>
      </header>
      <div className="space-y-4">
        <div className="flex justify-end items-center bg-white px-2 py-4 rounded-md shadow-sm border border-gray-200">
          <span className="text-gray-600 px-2"> {info.name}</span>
          <span className="font-semibold text-gray-700"> الاسم الكامل</span>
        </div>
        <div className="flex justify-end items-center bg-white px-2 py-4 rounded-md shadow-sm border border-gray-200">
          <span className="text-gray-600 px-1">{info.email}</span>
          <span className="font-semibold text-gray-700">البريد الإلكتروني</span>
        </div>
        <div className="flex justify-end items-center bg-white px-2 py-4 rounded-md shadow-sm border border-gray-200">
          <span className="text-gray-600 px-2"> {info.phone} </span>
          <span className="font-semibold text-gray-700">رقم الهاتف</span>
        </div>
        <div className="flex justify-end items-center bg-white px-2 py-4 rounded-md shadow-sm border border-gray-200">
          <span className="text-gray-600 px-2">
            123 شارع السلام، المدينة، الدولة
          </span>
          <span className="font-semibold text-gray-700">العنوان</span>
        </div>
        <div className="flex justify-end items-center bg-white px-2 py-4 rounded-md shadow-sm border border-gray-200">
          <span className="text-gray-600 px-2">
            من الأحد إلى الخميس، من 9 صباحًا إلى 5 مساءً
          </span>
          <span className="font-semibold text-gray-700">ساعات العمل</span>
        </div>
      </div>
      <footer className="mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-500 text-center leading-relaxed">
          ملاحظة يرجى التأكد من استخدام معلومات الاتصال هذه فقط للأغراض الرسمية.
          نحن هنا لخدمتك!
        </p>
      </footer>
    </div>
  );
};

export default SecretairContactInfo;
