import { Card, CardBody, CardHeader, Heading, HStack } from "@chakra-ui/react";
import { Role } from "../../../entity/Role.ts";
import useRoleStore from "../../../stores/requestRightsStore.ts";
import { useUserStore } from "../../../stores/requestUserStore.ts";
import useUserRoleAssignments from "../../../hooks/useUserRoleAssignments.ts";
import ErrorAlert from "../../alerts/ErrorAlert.tsx";
import useRevokeRoleStore from "../../../stores/revokeRightsStore.ts";
import CardBodyRequest from "./CardBodyRequest.tsx";
import CardBodyRevoke from "./CardBodyRevoke.tsx";
import CardBodyDenied from "./CardBodyDenied.tsx";

interface Props {
  role: Role;
}

const RequestRoleCard = ({ role }: Props) => {
  const { addRole, getRoleById, removeRole } = useRoleStore();
  const { addRoleToRevoke, getRevokeRoleById, removeRoleFromRevoke } =
    useRevokeRoleStore();

  const selectedUser = useUserStore((state) => state.selectedUser);
  const { data: userRoleAssignments, error } = useUserRoleAssignments(
    parseInt(selectedUser!.id!),
  );
  console.log(userRoleAssignments);
  const userRoleAssignment = userRoleAssignments?.find(
    (ura) => ura.role.id === role.id,
  );

  let operation = "";

  if (!selectedUser) {
    return <ErrorAlert>{error?.toString() || "Cannot find user"}</ErrorAlert>;
  }

  if (!userRoleAssignment) {
    operation = "A";
  } else {
    if (userRoleAssignment.assignmentStatus === "R") operation = "A";
    else if (userRoleAssignment.assignmentStatus === "A") operation = "R";
    else operation = "N";
  }

  const handleClick = () => {
    console.log(operation);
    if (operation === "A") {
      handleIfRequest();
    } else if (operation === "R") {
      handleIfRevoke();
    }
  };

  const handleIfRequest = () => {
    if (getRoleById(role.id!)) {
      removeRole(role.id!);
    } else {
      addRole(role);
    }
  };

  const handleIfRevoke = () => {
    if (getRevokeRoleById(role.id!)) {
      removeRoleFromRevoke(role.id!);
    } else {
      addRoleToRevoke(role);
    }
  };

  return (
    <>
      <Card size={"md"} cursor={"pointer"} onClick={handleClick}>
        <CardHeader>
          <HStack width={"100%"} justifyContent="space-between">
            <Heading overflow={"hidden"} size="lg">
              {role.name}
            </Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          {operation === "A" && <CardBodyRequest role={role} />}
          {operation === "R" && <CardBodyRevoke role={role} />}
          {operation === "N" && <CardBodyDenied role={role} />}
        </CardBody>
      </Card>
    </>
  );
};

export default RequestRoleCard;
