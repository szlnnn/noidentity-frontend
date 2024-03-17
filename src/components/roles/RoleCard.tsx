import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Role } from "../../entity/Role.ts";
import RolesIcons from "./RolesIcons.tsx";

interface Props {
  role: Role;
}

const RoleCard = ({ role }: Props) => {
  const getBackgroundColor = () => {
    return role.active ? "gray.700" : "gray.600";
  };

  return (
    <>
      <Card backgroundColor={getBackgroundColor()} size={"md"}>
        <CardHeader>
          <HStack width={"100%"} justifyContent="space-between">
            <Heading overflow={"hidden"} size="lg">
              {role.name}
            </Heading>
            <RolesIcons role={role} />
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

export default RoleCard;
