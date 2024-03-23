import axios from "axios";
import authService from "./authService.ts";
import { Role } from "../entity/Role.ts";
import { User } from "../entity/User.ts";
const API_URL = "http://localhost:8080/api/v1/";

const config = {
  headers: {
    Authorization: `Bearer ${authService.getCurrentUser().token}`,
  },
};

const postRequest = (
  requester: User,
  targetUser: User,
  rolesToRequest: Role[],
  rolesToRevoke: Role[],
) => {
  return axios.post(
    API_URL + "request",
    {
      requester: requester,
      targetUser: targetUser,
      rolesToRequest: rolesToRequest,
      rolesToRevoke: rolesToRevoke,
    },
    config,
  );
};

const approveTask = (taskId: string) => {
  return axios.put(API_URL + "request/task/approve/" + taskId, config);
};

const rejectTask = (taskId: string) => {
  return axios.put(API_URL + "request/task/reject/" + taskId, config);
};

const RequestService = {
  postRequest,
  approveTask,
  rejectTask,
};

export default RequestService;
