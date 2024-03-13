import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { User } from "../entity/User.ts";

const apiClient = new ApiClient<User[]>("/user");

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: apiClient.getAll,
  });

export default useUsers;
