import axios from "axios";
import authService from "./authService.ts";
import { Resource } from "../entity/Resource.ts";
const API_URL = "http://localhost:8080/api/v1/";

const config = {
  headers: {
    Authorization: `Bearer ${authService.getCurrentUser().token}`,
  },
};

const create = (resource: Resource) => {
  return axios.post(
    API_URL + "resource",
    {
      id: resource.id,
      name: resource.name,
      type: resource.type,
      azureConfig: {
        tenantId: resource.azureConfig?.tenantId,
        applicationId: resource.azureConfig?.applicationId,
        scope: resource.azureConfig?.scope,
        secret: resource.azureConfig?.secret,
      },
    },
    config,
  );
};

const ResourceService = {
  create,
};

export default ResourceService;
