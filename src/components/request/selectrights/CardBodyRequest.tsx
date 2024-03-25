import { Role } from "../../../entity/Role.ts";
import { Box, HStack, Text, Tooltip } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  role: Role;
}

const CardBodyRequest = ({ role }: Props) => {
  return (
    <Tooltip hasArrow label="Request" placement="right-end">
      <HStack justifyContent={"space-evenly"}>
        <Box justifyContent={"right"}>
          <Text>{role.description}</Text>
        </Box>
        <Box justifyContent={"left"}>
          <IoAddCircleOutline size={40}></IoAddCircleOutline>
        </Box>
      </HStack>
    </Tooltip>
  );
};

export default CardBodyRequest;
