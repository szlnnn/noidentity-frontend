import { Task } from "../../entity/Task.ts";
import { Box, Divider, HStack } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";

import Moment from "moment/moment";

interface Props {
  task: Task;
}

const TaskListElement = ({ task }: Props) => {
  const getColor = () => {
    if (task.operation === "A") {
      return "#00AEAE";
    } else {
      return "#B21031";
    }
  };

  return (
    <Box>
      <HStack justifyContent={"space-evenly"}>
        <Box marginRight={5} padding={5}>
          {task.operation === "A" ? <IoAdd size={30} /> : <FaMinus size={30} />}
        </Box>
        <HStack justifyContent={"space-between"} width={"80%"} height={"40px"}>
          <Box fontSize={17} color={getColor()}>
            {task.role.resource.name} | {task.role.name}
          </Box>
          <Divider orientation={"vertical"} border={"1px"}></Divider>
          <Box fontSize={17} color={getColor()}>
            {task.targetUser.firstName} {task.targetUser.lastName}
          </Box>
          <Divider orientation={"vertical"} border={"1px"}></Divider>
          <Box fontSize={17} color={getColor()}>
            {Moment(task.creationTime).format("yyyy-MM-DD")}
          </Box>
          <Divider orientation={"vertical"} border={"1px"}></Divider>
          <Box fontSize={17} color={getColor()}>
            {task.type} Task
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};

export default TaskListElement;
