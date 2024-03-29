import { IoCheckmarkDone } from "react-icons/io5";
import { Heading, VStack } from "@chakra-ui/react";
import authService from "../../service/authService.ts";
import useTasks from "../../hooks/useTasks.ts";

const NoTaskSelected = () => {
  const user = authService.getCurrentUser();
  const { data: tasks } = useTasks(user.id);
  return (
    <>
      {tasks && tasks.length === 0 && (
        <VStack spacing={5}>
          <Heading>You have no tasks for now </Heading>
          <IoCheckmarkDone color={"teal"} size={80} />
        </VStack>
      )}
    </>
  );
};

export default NoTaskSelected;
