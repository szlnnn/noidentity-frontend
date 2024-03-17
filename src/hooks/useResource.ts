import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { Resource } from "../entity/Resource.ts";

const apiClient = new ApiClient<Resource>("/resource");

const useResource = (id: number) =>
  useQuery({
    queryKey: ["resources", id],
    queryFn: () => apiClient.get(id),
  });

export default useResource;
