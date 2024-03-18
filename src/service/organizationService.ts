import axios from "axios";
import authService from "./authService.ts";
import { Organization } from "../entity/Organization.ts";
const API_URL = "http://localhost:8080/api/v1/";

const config = {
  headers: {
    Authorization: `Bearer ${authService.getCurrentUser().token}`,
  },
};

const create = (organization: Organization) => {
  return axios.post(
    API_URL + "organization",
    {
      id: organization.id,
      name: organization.name,
      company: organization.company,
      manager: organization.manager,
    },
    config,
  );
};

const update = (organization: Organization) => {
  return axios.put(
    API_URL + "organization",
    {
      id: organization.id,
      name: organization.name,
      company: organization.company,
      manager: organization.manager,
    },
    config,
  );
};

const OrganizationService = {
  create,
  update,
};

export default OrganizationService;
