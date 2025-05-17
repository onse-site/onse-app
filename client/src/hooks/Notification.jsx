/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: "",
    bgColor: "",
    isVisible: false,
  });

  const showNotification = (message, bgColor = "bg-white") => {
    setNotification({ message, bgColor, isVisible: true });

    setTimeout(() => {
      setNotification({ ...notification, isVisible: false });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification.isVisible && (
        <div
          className={`fixed z-11 top-4 left-[50%] transform translate-x-[-50%] md:left-4 md:translate-0   flex items-center justify-end w-full max-w-xs p-4 space-x-4 text-gray-500  ${
            notification.bgColor == "red" ? "bg-red-50" : "bg-white"
          } ${
            notification.bgColor == "red"
              ? "border-red-500"
              : "border-green-500"
          } border-2 rounded-lg shadow-sm  transform transition-transform duration-500 ease-in-out`}
          role="alert"
        >
          <div className="ps-4 text-sm font-normal text-right text-tertiary">
            {notification.message}
          </div>
          <svg
            className={`w-6 h-6  ${
              notification.bgColor == "red" ? "text-red-500" : "text-green-500"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
