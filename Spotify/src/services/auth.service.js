import api from "./api";

export const register = (data) => {
  return api.post("/auth/register", data);
};
// Note: The above function sends a POST request to the backend to register a new user. You can call this function from your Register.jsx component, passing the form data as an argument.

export const login = (data) => {
  return api.post("auth/login", data);
};