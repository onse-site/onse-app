/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import Office from "./Office";
import { Link } from "react-router-dom";
import Content from "./Content";
import api from "../../../../api/axios";
import { useDispatch } from "react-redux";
import { setOffices } from "../../../../features/po/poSlice";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const ftechOffices = async () => {
      try {
        const response = await api.get("api/org/provincial-offices");
        if (response.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        dispatch(setOffices(response.data.offices));
      } catch (error) {
        console.error("Error fetching info:", error);
        console.log(error);
      }
    };

    ftechOffices();
  }, []);

  const { offices } = useSelector((state) => state.po);

  if (!offices) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  return (
    <div className="flex relative flex-col lg:flex-row lg:gap-x-2">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 my-4 w-[90%] mx-auto text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none ring-2 ring-gray-300   focus:ring-gray-600"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className={`
    ${
      isOpen
        ? "fixed left-1/2 -translate-x-1/2 z-10 lg:fixed lg:right-1/2 lg:-translate-x-[-37.55rem]"
        : "hidden lg:block"
    }
    lg:fixed lg:w-[20rem] lg:top-[12rem] lg:right-4 lg:z-9
    w-[92%] top-[11.5rem] h-[calc(100vh_-_22rem)]
  `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 rounded-md border-3 border-gray-600 md:border-none ">
          <Link
            to="https://flowbite.com/"
            className="flex items-center justify-end gap-x-2 ps-2.5 mb-5 text-right"
          >
            <span className="font-bold text-tertiary text-lg">
              المكاتب الولائية
            </span>
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
          </Link>
          <ul className="space-y-2 font-medium">
            {offices.map((office, index) => (
              <Office
                key={index}
                office={office}
                func={() => {
                  setIsOpen(!isOpen);
                }}
              />
            ))}
          </ul>
        </div>
      </aside>

      <Content />
    </div>
  );
};

export default SideBar;
