import React from "react";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";
import api from "../../../../api/axios";
import { setMembers, setPosts } from "../../../../features/po/poSlice";
import { useDispatch } from "react-redux";

const Office = ({ office, func }) => {
  const dispatch = useDispatch();
  const handleOfficeClick = async (event) => {
    func();
    const officeId = event.target.id;

    try {
      const response = await api.get(`api/org/provincial-offices/${officeId}`);
      if (response.status !== 200) throw new Error("Failed to fetch data");
      dispatch(setMembers(response.data.members));
      dispatch(setPosts(response.data.posts));
    } catch (error) {
      console.log("fetching error", error);
    }
  };

  return (
    <li>
      <button
        className="flex items-center w-full justify-end p-2 text-gray-900 rounded-lg  gap-x-2 bg-gray-300 hover:bg-gray-100 text-right"
        onClick={handleOfficeClick}
        id={office.id}
      >
        {office.name}
        <BuildingOfficeIcon className="h-5 w-5 text-tertiary" />
      </button>
    </li>
  );
};

export default Office;
