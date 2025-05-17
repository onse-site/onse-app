import axios from "axios";

const api = axios.create({
  baseURL: "https://onse-app.onrender.com/",
  withCredentials: true,
});

export default api;
