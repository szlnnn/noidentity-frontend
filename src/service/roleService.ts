import axios from "axios";
import authService from "./authService.ts";
import { Role } from "../entity/Role.ts";
const API_URL = "http://localhost:8080/api/v1/";

const config = {
  headers: {
    Authorization: `Bearer ${authService.getCurrentUser().token}`,
  },
};

const create = (role: Role) => {
  return axios.post(
    API_URL + "roles",
    {
      id: role.id,
      name: role.name,
      description: role.description,
      type: role.type,
      created: role.created,
      resource: role.resource,
      resourceRoleId: role.resourceRoleId,
      active: role.active,
    },
    config,
  );
};

const update = (role: Role) => {
  return axios.put(
    API_URL + "roles",
    {
      id: role.id,
      name: role.name,
      description: role.description,
      type: role.type,
      created: role.created,
      resource: role.resource,
      resourceRoleId: role.resourceRoleId,
      active: role.active,
    },
    config,
  );
};

const ResourceService = {
  create,
  update,
};

export default ResourceService;
