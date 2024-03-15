import axios from "axios";
import authService from "./authService.ts";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authService.getCurrentUser().token}`,
      },
    };
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}

export default ApiClient;
