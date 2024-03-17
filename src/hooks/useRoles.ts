import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { Role } from "../entity/Role.ts";

const apiClient = new ApiClient<Role[]>("/roles");

const useRoles = (resourceId: number) =>
  useQuery({
    queryKey: ["roles", resourceId],
    queryFn: () => apiClient.getAllById(resourceId),
  });

export default useRoles;
