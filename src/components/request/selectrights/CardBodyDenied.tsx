import { Role } from "../../../entity/Role.ts";
import { Box, HStack, Text, Tooltip } from "@chakra-ui/react";
import { MdOutlineHighlightOff } from "react-icons/md";

interface Props {
  role: Role;
}

const CardBodyDenied = ({ role }: Props) => {
  return (
    <Tooltip
      hasArrow
      label="Not allowed due to running request"
      placement="right-end"
    >
      <HStack justifyContent={"space-evenly"}>
        <Box justifyContent={"right"}>
          <Text>{role.description}</Text>
        </Box>
        <Box justifyContent={"left"}>
          <MdOutlineHighlightOff size={40}></MdOutlineHighlightOff>
        </Box>
      </HStack>
    </Tooltip>
  );
};

export default CardBodyDenied;
