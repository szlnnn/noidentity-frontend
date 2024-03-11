import axios from "axios";
const API_URL = "http://localhost:8080/";

const register = (
  login: string,
  firstName: string,
  password: string,
  lastName: string,
  role: string,
) => {
  return axios.post(API_URL + "register", {
    login,
    firstName,
    lastName,
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
