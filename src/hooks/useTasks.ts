import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { Task } from "../entity/Task.ts";

const apiClient = new ApiClient<Task[]>("/request/tasks");

const useTasks = (userId: number) =>
  useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => apiClient.getAllById(userId),
  });

export default useTasks;
