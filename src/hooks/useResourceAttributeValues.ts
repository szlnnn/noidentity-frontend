import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { ResourceAttributeValue } from "../entity/ResourceAttributeValue.ts";

const apiClient = new ApiClient<ResourceAttributeValue[]>("/resource/values");

const useResourceAttributeValues = () =>
  useQuery({
    queryKey: ["resource-attribute-values"],
    queryFn: () => apiClient.getAll(),
    staleTime: 90000000,
  });

export default useResourceAttributeValues;
