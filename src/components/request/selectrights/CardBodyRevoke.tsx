import { Role } from "../../../entity/Role.ts";
import { Box, HStack, Text, Tooltip } from "@chakra-ui/react";
import { FiMinusCircle } from "react-icons/fi";

interface Props {
  role: Role;
}

const CardBodyRevoke = ({ role }: Props) => {
  return (
    <Tooltip hasArrow label="Revoke" placement="right-end">
      <HStack justifyContent={"space-evenly"}>
        <Box justifyContent={"right"}>
          <Text>{role.description}</Text>
        </Box>
        <Box justifyContent={"left"}>
          <FiMinusCircle size={40}></FiMinusCircle>
        </Box>
      </HStack>
    </Tooltip>
  );
};

export default CardBodyRevoke;
