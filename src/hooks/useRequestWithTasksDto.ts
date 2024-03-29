import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { RequestWithTasksDto } from "../entity/dto/RequestWithTasksDto.ts";

const apiClient = new ApiClient<RequestWithTasksDto[]>("/request/requester");

const useRequestWithTasksDto = (userId: number) =>
  useQuery({
    queryKey: ["requesters-requests", userId],
    queryFn: () => apiClient.getAllById(userId),
  });

export default useRequestWithTasksDto;
