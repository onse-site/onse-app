import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";

import api from "../../api/axios.js";

export default function BasicTableOne() {
  const [offices, setOffices] = useState([
    {
      id: "",
      name: "",
      email: "",
      phone: "",
      cover: "b",
      isActive: true,
    },
  ]);
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await api.get("/api/dashboard/offices");
        if (response.status !== 200) {
          throw new Error("error");
        }

        setOffices(response.data.offices);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchOffices();
  }, []);
  return (
    <>
      <div className="px-4 font-bold text-2xl text-gray-800 w-full  flex items-center justify-between">
        <span>Recnet Added Offices </span>
        <a
          href="/basic-tables"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          See all
        </a>
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
                  email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  phone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Active
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
              {offices?.slice(-5).map((office) => (
                <TableRow key={office.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img width={40} height={40} src={office.cover} alt="" />
                      </div>
                      <div>
                        <span className="block whitespace-nowrap font-medium text-gray-800 text-theme-sm w-[10rem] dark:text-white/90">
                          {office.name}
                        </span>
                        {/*  <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.user.role}
                      </span> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {office.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">{office.phone}</div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={office.isActive === true ? "success" : "warning"}
                    >
                      {office.isActive}
                    </Badge>
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
