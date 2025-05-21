import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { useEffect, useState } from "react";
import api from "../../../api/axios.js";
import { DeleteMemebr } from "../../ecommerce/ApiHelper.ts";

import { useNotification } from "../../../hooks/Notification.js";

export default function BasicTableOne() {
  const [memebrs, setMembers] = useState([
    {
      id: "",
      name: "",
      role: "",
      email: "",
      avatar: "b",
      office: {
        name: "",
        cover: "b",
      },
    },
  ]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get("/api/dashboard/members");
        if (response.status !== 200) {
          throw new Error("error");
        }

        setMembers(response.data.members);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchMembers();
  }, []);

  const { showNotification } = useNotification();

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  member
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  office
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {memebrs?.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={member.avatar}
                          alt={member.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {member.name}
                        </span>
                        {/*  <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {member.user.role}
                      </span> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 whitespace-nowrap w-50 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {member.office?.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">{member.email}</div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        member.role === "OP"
                          ? "success"
                          : member.role === "OM"
                          ? "warning"
                          : "error"
                      }
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <button
                      className="text-red-400"
                      id={member.id}
                      onClick={async (e) => {
                        const message = await DeleteMemebr(
                          (e.target as HTMLButtonElement).id
                        );

                        showNotification(
                          message,
                          message === "Error deleting member" ? "red" : "green"
                        );
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
