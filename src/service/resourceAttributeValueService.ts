import axios from "axios";
import authService from "./authService.ts";
import { ResourceAttributeValue } from "../entity/ResourceAttributeValue.ts";
const API_URL = "http://localhost:8080/api/v1/";

const config = {
  headers: {
    Authorization: `Bearer ${authService.getCurrentUser().token}`,
  },
};

const update = (value: ResourceAttributeValue) => {
  console.log(value);
  return axios.put(
    API_URL + "resource/value",
    {
      id: value.id,
      name: value.name,
      identifier: value.identifier,
      managed: value.managed,
      type: value.type,
      resource: value.resource,
    },
    config,
  );
};

const ResourceAttributeValueService = {
  update,
};

export default ResourceAttributeValueService;
