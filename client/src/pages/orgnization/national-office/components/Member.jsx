import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Member = ({ props }) => {
  const member = props;

  if (!member) {
    return;
  }

  return (
    <div>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <img
          className="mx-auto  lg:w-36 lg:h-36 rounded-full"
          src={member.avatar}
          alt="Bonnie Avatar"
        />
        <h3 className="mb-1 text-sm py-2  lg:text-2xl font-bold tracking-tight text-tertiary ">
          <a href="#">{member.name}</a>
        </h3>
        <p className="hidden lg:block">
          {" "}
          {member.role === "OP" ? "رئيس المكتب" : "عضو المكتب"}
        </p>
        <span className="inline-flex text-[10px] font-bold  lg:hidden items-center rounded-md bg-gray-50 px-2 py-1   text-gray-600 ring-1 ring-gray-500/10 ring-inset">
          {member.role === "OP" ? "رئيس المكتب" : "عضو المكتب"}
        </span>

        <ul className="py-4 flex justify-center mt-4 space-x-4">
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
    </div>
  );
};

export default Member;
