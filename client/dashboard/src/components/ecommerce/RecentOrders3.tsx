import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

/* import Badge from "../../ui/badge/Badge"; */

import api from "../../api/axios";
import { Link } from "react-router";

export default function BasicTableOne() {
  const [messages, setMessages] = useState([
    {
      id: "",
      sender: "",
      contact: "",
      content: "",
    },
  ]);
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await api.get("api/dashboard/messages");
        if (response.status !== 200) {
          throw new Error("error");
        }

        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchOffices();
  }, []);

  return (
    <>
      <div className="px-4 font-bold text-2xl text-gray-800 w-full  flex items-center justify-between">
        <span>Recnet Recived Messages </span>
        <Link
          to="/basic-tables"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          See all
        </Link>
      </div>
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
                  name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  email / phone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  subject
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  N/A
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  N/A
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {messages?.slice(-5).map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {/*  <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img width={40} height={40} src="b" alt="" />
                      </div> */}
                      <div>
                        <span className="block font-medium break-words  text-gray-800 text-theme-sm dark:text-white/90">
                          {message.sender}
                        </span>
                        {/*  <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.user.role}
                      </span> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {message.contact}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">{message.content}</div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {/*  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge> */}
                    N/A
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    N/A
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
