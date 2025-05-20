import axios from "axios";

const api = axios.create({
  /*   baseURL: "http://localhost:3000/",*/
  /*  baseURL: "https://onse-app.onrender.com/", */
  baseURL: "http://onse.abdeldjalile.me",
  withCredentials: true,
});

export default api;
