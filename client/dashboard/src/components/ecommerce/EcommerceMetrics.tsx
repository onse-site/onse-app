import {
  /*  ArrowDownIcon, */
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import api from "../../api/axios";
import { useEffect, useState } from "react";

export default function EcommerceMetrics() {
  const [statics, setStatics] = useState({
    totalMembers: null,
    totalPosts: null,
    memberGrowthRate: null,
  });

  useEffect(() => {
    const fetchStatics = async () => {
      try {
        const response = await api.get("api/dashboard/statics");
        if (response.status !== 200) {
          throw new Error("error");
        }
        setStatics(response.data);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchStatics();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Member count
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {statics?.totalMembers}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            {statics?.memberGrowthRate} %
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Posts - Ads - Blogs ...
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {statics?.totalPosts}
            </h4>
          </div>

          {/* <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
