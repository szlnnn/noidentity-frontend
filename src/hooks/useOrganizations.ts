import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/api-client";
import { Organization } from "../entity/Organization.ts";

const apiClient = new ApiClient<Organization[]>("/organization");

const useOrganizations = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: apiClient.getAll,
  });

export default useOrganizations;
