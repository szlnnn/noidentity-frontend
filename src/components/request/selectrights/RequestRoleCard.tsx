import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Role } from "../../../entity/Role.ts";
import useRoleStore from "../../../stores/requestRightsStore.ts";

interface Props {
  role: Role;
}

const RequestRoleCard = ({ role }: Props) => {
  const { addRole, getRoleById, removeRole } = useRoleStore();
  const handleClick = () => {
    if (getRoleById(role.id!)) {
      removeRole(role.id!);
    } else {
      addRole(role);
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
          <HStack>
            <Text overflow={"hidden"} fontSize="lg">
              {role.description}
            </Text>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default RequestRoleCard;
