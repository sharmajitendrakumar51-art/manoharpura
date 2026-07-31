import axios from "axios";

const api = axios.create({
  baseURL: "https://manoharpura.onrender.com/api",
});

export default api;