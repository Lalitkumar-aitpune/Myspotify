import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

export default api;

// for docker change form 3000 to 5001 (server port)