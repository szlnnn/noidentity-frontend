import { Resource } from "../../entity/Resource.ts";
import { Heading } from "@chakra-ui/react";

interface Props {
  resource: Resource;
}

const RoleManagementHeading = ({ resource }: Props) => {
  return <Heading>{"Manage roles under " + resource.name}</Heading>;
};

export default RoleManagementHeading;
