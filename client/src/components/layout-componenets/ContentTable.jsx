import {
  UserGroupIcon,
  BriefcaseIcon,
  CogIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import { Skeleton } from "@mui/material";

const features = [
  {
    name: "أنشطة",
    description: "هذا وصف افتراضي للأنشطة يوضح تفاصيلها وفوائدها.",
    icon: UserGroupIcon,
  },
  {
    name: "أعمال",
    description: "هذا وصف افتراضي للأعمال يوضح تفاصيلها وفوائدها.",
    icon: BriefcaseIcon,
  },
  {
    name: "خدمات ",
    description: "هذا وصف افتراضي للخدمات يوضح تفاصيلها وفوائدها.",
    icon: CogIcon,
  },
  {
    name: "تطوع  ",
    description: " هذا وصف افتراضي للتطوع يوضح تفاصيله وفوائده.",
    icon: HeartIcon,
  },
];

export default function ContentTable() {
  return (
    <div className=" bg-white  sm:py-16">
      <div className=" max-w-full px-6  lg:px-8">
        <div className=" flex   items-center justify-between  gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
          <img
            alt=""
            src="b"
            width={1200}
            height={600}
            className="hidden md:flex  ml-[-16rem]  max-w-none rounded-3xl shadow-2xl  border-1 border-[#5b5b5b] outline-none ring-0  bg-gradient-to-r from-gray-300 via-gray-200 to-white animate-pulse  overflow-hidden"
          />

          <div className="lg:pt-4 lg:mr-20 lg:pl-8 text-right">
            <div className="">
              <h2 className="text-base/7 font-semibold text-[#4d80e4]">
                منظمتنا
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 ">
                سير عمل أفضل
              </p>
              <p className="mt-6 text-md max-w-[600px] text-gray-600 break-words whitespace-normal ">
                و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل
                الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد
                أن يشعر بالسعادة التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب
                الألم الذي ربما تنجم عنه بعض المتعة ؟
              </p>
              <div className="mt-8 space-y-8 text-base/7  text-gray-600 ">
                {features.map((feature) => (
                  <div key={feature.name} className="">
                    <p className="flex flex-wrap items-center justify-end gap-x-2 font-semibold text-gray-900 ">
                      {feature.name}
                      <feature.icon className=" size-5 text-[#4d80e4]" />
                    </p>{" "}
                    <p className="">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
