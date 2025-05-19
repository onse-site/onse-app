/* eslint-disable @typescript-eslint/no-unused-vars */
import api from "../../api/axios";
/* import { useEffect, useState } from "react";
 */
const DeleteMemebr = async (id: string) => {
  try {
    const response = await api.delete(`api/dashboard/member/${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete member");
    }
    return response.data.message;
  } catch (error) {
    return "Error deleting member";
  }
};

const DeleteOffice = async (id: string) => {
  try {
    const response = await api.delete(`api/dashboard/office/${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete office");
    }
    return response.data.message;
  } catch (error) {
    return "Error deleting office";
  }
};

const DeleteMessage = async (id: string) => {
  try {
    const response = await api.delete(`api/dashboard/message/${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete message");
    }
    return response.data.message;
  } catch (error) {
    return "Error deleting message";
  }
};
export { DeleteMemebr, DeleteOffice, DeleteMessage };
