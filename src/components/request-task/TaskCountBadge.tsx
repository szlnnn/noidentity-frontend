import { Box } from "@chakra-ui/react";
import useTasks from "../../hooks/useTasks.ts";
import authService from "../../service/authService.ts";

const TaskCountBadge = () => {
  const user = authService.getCurrentUser();
  const { data: tasks } = useTasks(user.id);
  const length = tasks?.length || 0;
  return (
    <>
      {length > 0 && (
        <Box
          position="absolute"
          top="0"
          right="0"
          zIndex="tooltip"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transform="translate(50%, -30%)"
          width="22px"
          height="22px"
          borderRadius="full"
          bgColor="#8B4950"
          color="white"
          fontSize="sm"
        >
          {length}
        </Box>
      )}
    </>
  );
};

export default TaskCountBadge;
