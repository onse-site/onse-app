import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../../api/axios";
import { useDispatch } from "react-redux";
import { setInfo, setPosts } from "../../../../features/sg/sgSlice";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
const Head = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSG = async () => {
      try {
        const response = await api.get("api/org/secretary-general");
        if (response.status !== 200) {
          throw new Error("Failed to fetch info");
        }
        dispatch(setInfo(response.data.info));
        dispatch(setPosts(response.data.posts));
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };
    fetchSG();
  }, []);

  const { info } = useSelector((state) => state.sg);
  if (!info) {
    return (
      <div className="flex items-center justify-center h-full my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-end gap-y-6 h-full  rounded-b-2xl w-full my-8">
      <div className="mx-4 w-[90%] lg:w-[60%]">
        <div className="items-center justify-end bg-gray-50 rounded-lg shadow sm:flex border-2 border-gray-300 ">
          <Link to="#" className="md:hidden">
            <img
              className={`w-full h-[300px] rounded-lg sm:rounded-none lg:sm:rounded-r-lg shadow-2xl  border-2 border-[#5b5b5b] outline-none ring-0 ${
                !info.avatar
                  ? "bg-gradient-to-r from-gray-300 via-gray-200 to-white animate-pulse  overflow-hidden"
                  : ""
              }  `}
              src={info.avatar ? info.avatar : ""}
            />
          </Link>

          <div className="p-5 ">
            <h3 className="text-4xl text-right font-bold tracking-tight text-gray-700  ">
              <Link href="#"> {info.name}</Link>
              <br />
              <span className="text-gray-500 text-[1rem] py-4 my-4  text-right">
                الأمين العام
              </span>
            </h3>

            <p className="mt-3 mb-4 lg:my-4  break-words lg:max-w-[40rem] word-break font-light text-gray-700 text-right ">
              {info.bio}
            </p>
            <ul className="flex justify-end space-x-4 sm:mt-0">
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 ">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900 ">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
          <Link href="#" className="hidden md:block">
            <img
              className={`lg:w-[300px] md:w-[900px] md:h-[300px] w-full h-[300px] rounded-lg sm:rounded-none lg:sm:rounded-r-lg shadow-2xl  border-2 border-[#5b5b5b] outline-none ring-0 ${
                info.avatar !== ""
                  ? ""
                  : "bg-gradient-to-r from-gray-300 via-gray-200 to-white animate-pulse  overflow-hidden"
              } `}
              src={info.avatar}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Head;
