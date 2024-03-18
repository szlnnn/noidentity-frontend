import axios from "axios";
import { User } from "../entity/User.ts";
import authService from "./authService.ts";
const API_URL = "http://localhost:8080/api/v1/";

const config = {
  headers: {
    Authorization: `Bearer ${authService.getCurrentUser().token}`,
  },
};

const update = (user: User) => {
  return axios.put(
    API_URL + "user",
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      login: user.login,
      email: user.email,
      startDate: user.startDate,
      endDate: user.endDate,
      organization: user.organization,
    },
    config,
  );
};

const UserService = {
  update,
};

export default UserService;
