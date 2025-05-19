import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { useNotification } from "../../hooks/Notification";
import { Spinner } from "flowbite-react";

const Profile = () => {
  const dispatch = useDispatch();
  const { member, status } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const { showNotification } = useNotification();

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/auth/logout");
      if (response.status === 200) {
        showNotification("تم تسجيل الخروج بنجاح", "green");
        dispatch(logout());
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error(errorMessage);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <img
          data-popover-target="popover-user-profile"
          type="button"
          className="w-16 lg:relative absolute right-3 h-16 rounded-full border-3 border-[#4d80e4] "
          onClick={() => setOpen(!open)}
          src={member.role == "SG" ? member.avatar : member.office.cover}
        />

        {open && (
          <div
            data-popover
            id="popover-user-profile"
            role="tooltip"
            className="absolute z-10 left-0 top-20  inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-gray-900/5 "
          >
            <div className="p-3">
              <div className="flex items-center justify-end mb-2 gap-x-3">
                <div>
                  <p className="text-base text-right font-semibold text leading-none text-gray-900 ">
                    <a href="#">
                      {member.role == "SG" ? member.name : member.office.name}
                    </a>
                  </p>
                  <p className="my-2 text-sm text-right font-normal">
                    <a href="#" className="text-right hover:underline">
                      {member.role == "SG" ? "" : member.name}
                    </a>
                  </p>
                </div>
                <a href="#">
                  <img
                    className="w-12 h-12 min-w-12 rounded-full border-3 border-[#4d80e4]"
                    src={
                      member.role == "SG" ? member.avatar : member.office.cover
                    }
                    alt="Jese Leos"
                  />
                </a>
              </div>
              <div className="w-full flex flex-col items-end justify-end gap-y-0.5 my-2">
                <span className="inline-flex items-center rounded-md my-2   px-4 py-1 text-xs font-medium bg-gray-100  ring-1 ring-gray-500/10 ring-inset">
                  {member.role == "SG"
                    ? "الامين العام "
                    : member.role == "OP"
                    ? "رئيس مكتب"
                    : "عضو"}
                </span>
                <Link>
                  <span className="text-blue-400  cursor-pointer">
                    {member.email}
                  </span>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center">
                <Link
                  to={`/organization/edit-profile/${member._id}`}
                  type="button"
                  className="text-gray-800 text-center w-full bg-gray-200 hover:bg-gray-300 focus:ring-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 my-2 "
                >
                  تعديل الملف الشخصي
                </Link>
              </div>

              <div>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-white w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 my-2 "
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
            <div data-popper-arrow></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
