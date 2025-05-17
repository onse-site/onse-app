import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { SmartSkeleton } from "@ela-labs/smart-skeleton-react";

const Member = ({ props }) => {
  const member = props;

  if (!member) {
    return;
  }

  return (
    <div className="text-center text-gray-500 dark:text-gray-400">
      <img
        className="mx-auto rounded-md lg:w-36 lg:h-36  "
        src={member.avatar}
        alt="Bonnie Avatar"
      />
      <h3 className="mb-1 text-sm pt-2  lg:text-2xl font-bold tracking-tight text-tertiary ">
        <a href="#">{member.name}</a>
      </h3>
      <p className="hidden lg:block">
        {" "}
        {member.role === "OP" ? "رئيس المكتب" : "عضو المكتب"}
      </p>
      <span className="inline-flex text-[10px] font-bold  lg:hidden items-center rounded-md  px-2    text-gray-600 ">
        {member.role === "OP" ? "رئيس المكتب" : "عضو المكتب"}
      </span>

      <ul className="flex justify-center space-x-4 invisible">
        <li>
          <Link
            to={member.sociallinks?.facebook}
            className="text-[#39569c] hover:text-gray-900 dark:hover:text-white"
          >
            <FaFacebook size={20} className="text-gray-700" />
          </Link>
        </li>
        <li>
          <Link
            href={member.sociallinks?.instagram}
            className="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
          >
            <FaInstagram size={20} className="text-gray-700" />
          </Link>
        </li>
        <li>
          <Link
            href={member.sociallinks?.twitter}
            className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
          >
            <FaTwitter size={20} className="text-gray-700" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Member;
