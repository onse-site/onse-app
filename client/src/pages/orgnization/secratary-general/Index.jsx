/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Head from "./components/Head";
import Info from "./components/Info";
import PinedPost from "./components/PinedPost";
import { Ads, Content, Posts } from "./components/Posts";

import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { HiClipboardList, HiPhone, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdEdit, MdPostAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import ManegeProfile from "./components/Managers/ManegeProfile";
import SecretairContactInfo from "./components/SecretairContactInfo";
import AddPost from "../../../components/posts-componenets/AddPost";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ activeTab, setActiveTab }) => {
  const { member, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <div
        dir="rtl"
        className="lg:hidden  lg:px-20 flex items-center justify-center gap-x-3 "
      >
        <button
          onClick={() => {
            setActiveTab("profile");
          }}
          className="relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 w-fit"
        >
          الملف الشخصي
        </button>
        <Dropdown
          label="استعراض المزيد"
          className="[&>svg]:hidden [&+div]:w-[12rem] [&+div]:rounded-lg [&+div]:border-2 [&+div]:border-[#5b5b5b]  [&+div]:p-2"
        >
          <DropdownItem
            className="rounded-md "
            onClick={() => {
              setActiveTab("posts");
            }}
          >
            المنشورات
          </DropdownItem>
          <DropdownItem
            className="rounded-md "
            onClick={() => setActiveTab("ads")}
          >
            الأعلانات
          </DropdownItem>
          <DropdownItem
            className="rounded-md "
            onClick={() => setActiveTab("contact")}
          >
            معلومات الاتصال
          </DropdownItem>
          <DropdownDivider />
          {member?.role == "SG" && (
            <>
              <DropdownItem
                className="rounded-md "
                onClick={() => setActiveTab("addPost")}
              >
                إضافة منشور
              </DropdownItem>
              <DropdownItem
                className="rounded-md "
                onClick={() => setActiveTab("editProfile")}
              >
                تعديل الملف الشخصي
              </DropdownItem>
            </>
          )}
        </Dropdown>
      </div>

      <div dir="rtl" className="hidden lg:block lg:mt-6 lg:px-20">
        <div className="w-full flex items-center justify-center gap-x-5">
          <button
            onClick={() => {
              setActiveTab("profile");
            }}
            className={`relative px-5 flex items-center justify-center  text-center font-medium  w-fit ${
              activeTab === "profile"
                ? "border-[#4d80e4]  border-b-4 text-[#4d80e4]"
                : "text-gray-500"
            }`}
          >
            <HiUserCircle className="m-2 w-5 h-5" /> الملف الشخصي
          </button>

          <button
            onClick={() => {
              setActiveTab("posts");
            }}
            className={`relative px-5 flex items-center justify-center  text-center font-medium  w-fit ${
              activeTab === "posts"
                ? "border-[#4d80e4]  border-b-4 text-[#4d80e4]"
                : "text-gray-500"
            }`}
          >
            <MdDashboard className="m-2 w-5 h-5" /> المنشورات
          </button>

          <button
            onClick={() => {
              setActiveTab("ads");
            }}
            className={`relative px-5 flex items-center justify-center  text-center font-medium  w-fit ${
              activeTab === "ads"
                ? "border-[#4d80e4]  border-b-4 text-[#4d80e4]"
                : "text-gray-500"
            }`}
          >
            <HiClipboardList className="m-2 w-5 h-5" /> الأعلانات
          </button>

          {member?.role == "SG" && (
            <>
              <button
                to={`/organization/edit-profile/${member?.id}`}
                onClick={() => {
                  setActiveTab("editProfile");
                }}
                className={`relative px-5 flex items-center justify-center  text-center font-medium  w-fit ${
                  activeTab === "editProfile"
                    ? "border-[#4d80e4]  border-b-4 text-[#4d80e4]"
                    : "text-gray-500"
                }`}
              >
                <MdEdit className="m-2 w-5 h-5" /> تعديل الملف الشخصي
              </button>

              <button
                onClick={() => {
                  setActiveTab("addPost");
                }}
                className={`relative px-5 flex items-center justify-center  text-center font-medium  w-fit ${
                  activeTab === "addPost"
                    ? "border-[#4d80e4]  border-b-4 text-[#4d80e4]"
                    : "text-gray-500"
                }`}
              >
                <MdPostAdd className="m-2 w-5 h-5" /> إضافة منشور
              </button>
            </>
          )}

          <button
            onClick={() => {
              setActiveTab("contact");
            }}
            className={`relative px-5 flex items-center justify-center  text-center font-medium  w-fit ${
              activeTab === "contact"
                ? "border-[#4d80e4]  border-b-4 text-[#4d80e4]"
                : "text-gray-500"
            }`}
          >
            <HiPhone className="m-2 w-5 h-5" />
            معلومات الاتصال
          </button>
        </div>
      </div>
    </div>
  );
};
const Index = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { member, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Head />
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "profile" && (
          <div className="my-30">
            <Info />
            <PinedPost />
            <Content />
          </div>
        )}
        {activeTab === "posts" && (
          <div className="my-30">
            <Posts />
          </div>
        )}
        {activeTab === "ads" && (
          <div className="my-30">
            <Ads />
          </div>
        )}
        {activeTab === "editProfile" && member?.role == "SG" && (
          <ManegeProfile />
        )}
        {activeTab === "addPost" && member?.role == "SG" && <AddPost />}
        {activeTab === "contact" && <SecretairContactInfo />}
      </div>
    </>
  );
};

export default Index;
