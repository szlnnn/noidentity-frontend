import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { Resource } from "../entity/Resource.ts";

const apiClient = new ApiClient<Resource[]>("/resource");

const useResources = () =>
  useQuery({
    queryKey: ["resources"],
    queryFn: apiClient.getAll,
  });

export default useResources;
