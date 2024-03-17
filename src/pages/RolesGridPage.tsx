import { useParams } from "react-router-dom";
import useResource from "../hooks/useResource.ts";
import { Spinner } from "@chakra-ui/react";
import RoleManagementHeading from "../components/roles/RoleManagementHeading.tsx";
import RoleManagementGrid from "../components/roles/RoleManagementGrid.tsx";

const RolesGridPage = () => {
  const { id } = useParams();

  const { data: resource, isLoading, error } = useResource(parseInt(id!));

  if (isLoading) return <Spinner />;

  if (error || !resource) throw error;

  return (
    <>
      <RoleManagementHeading resource={resource}></RoleManagementHeading>
      <RoleManagementGrid resource={resource}></RoleManagementGrid>
    </>
  );
};

export default RolesGridPage;
