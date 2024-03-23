import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { Task } from "../entity/Task.ts";

const apiClient = new ApiClient<Task>("/request/task");

const useTask = (id: number) =>
  useQuery({
    queryKey: ["task", id],
    queryFn: () => apiClient.get(id),
  });

export default useTask;
