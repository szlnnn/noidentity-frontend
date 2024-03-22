import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { Role } from "../entity/Role.ts";

const apiClient = new ApiClient<Role[]>("/roles");

const useAllRoles = () =>
  useQuery({
    queryKey: ["roles"],
    queryFn: () => apiClient.getAll(),
  });

export default useAllRoles;
