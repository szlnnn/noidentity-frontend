import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { UserRoleAssignment } from "../entity/UserRoleAssignment.ts";

const apiClient = new ApiClient<UserRoleAssignment[]>("/roles/user");

const useAllUserRoleAssignments = () =>
  useQuery({
    queryKey: ["user-role-assignment"],
    queryFn: apiClient.getAll,
  });

export default useAllUserRoleAssignments;
