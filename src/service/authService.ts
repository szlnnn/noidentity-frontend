import axios from "axios";
import { User } from "../entity/User.ts";
const API_URL = "http://localhost:8080/";

const register = (accountDto: User, password: string, role: string) => {
  return axios.post(API_URL + "register", {
    accountDto,
    password,
    role,
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      login: username,
      password,
    })
    .then((response) => {
      if (response.data.login) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
