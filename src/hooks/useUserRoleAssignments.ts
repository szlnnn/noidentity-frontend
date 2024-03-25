import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { UserRoleAssignment } from "../entity/UserRoleAssignment.ts";

const apiClient = new ApiClient<UserRoleAssignment[]>("/roles/user");

const useUserRoleAssignments = (userId: number) =>
  useQuery({
    queryKey: ["user-role-assignment", userId],
    queryFn: () => apiClient.getAllById(userId),
  });

export default useUserRoleAssignments;
