/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AddPost from "../../../components/posts-componenets/AddPost";
import { Posts } from "../../../components/posts-componenets/Posts";
import Team from "./components/Team";
import Banner from "./components/Banner";
import { setMembers, setPosts } from "../../../features/no/noSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import api from "../../../api/axios";
import { Spinner } from "flowbite-react";

const Index = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNO = async () => {
      try {
        const response = await api.get("/api/org/national-office");
        if (response.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        dispatch(setMembers(response.data.members));
        dispatch(setPosts(response.data.posts));
      } catch (error) {
        console.error("Error fetching info:", error);
        console.log(error);
      }
    };
    fetchNO();
  }, []);

  const { members, posts } = useSelector((state) => state.no);
  const { member } = useSelector((state) => state.auth);

  return (
    <div className="">
      <Team />
      <hr className="w-[80%] mx-auto bg-gray-300 h-1 border-0 rounded-2xl" />

      {member && (
        <>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setOpenAdd(!openAdd);
              }}
              className="lg:hidden w-[80%] bg-gray-200 text-tertiary px-6 py-2 rounded-lg"
            >
              إضافة منشور
            </button>
          </div>

          <Banner
            child={
              <button
                onClick={() => {
                  setOpenAdd(!openAdd);
                }}
                className="bg-gray-300  text-tertiary   px-6 py-2 rounded-lg"
              >
                إضافة منشور
              </button>
            }
          />
        </>
      )}

      {openAdd && <AddPost />}
      <Posts posts={posts} />
    </div>
  );
};

export default Index;
