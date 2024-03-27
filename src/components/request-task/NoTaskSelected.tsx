import { IoCheckmarkDone } from "react-icons/io5";
import { Heading, VStack } from "@chakra-ui/react";

const NoTaskSelected = () => {
  return (
    <VStack spacing={5}>
      <Heading>You have no tasks for now </Heading>
      <IoCheckmarkDone color={"teal"} size={80} />;
    </VStack>
  );
};

export default NoTaskSelected;
