import { useParams } from "react-router-dom";
import useTask from "../../hooks/useTask.ts";
import { Box, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import DefinitionItem from "./DefinitionItem.tsx";
import Moment from "moment";
import TaskActionButtons from "./TaskActionButtons.tsx";

const TaskInfo = () => {
  const { id } = useParams();
  const { data: task, isLoading } = useTask(parseInt(id!));

  return (
    <Box width={"35%"} height={"500px"}>
      <Heading>
        {task?.type === "manager" ? "Manager Task" : "Resource Operator Task"}
      </Heading>
      {isLoading && <Spinner />}
      <SimpleGrid height={"100%"} columns={2} as="dl" marginLeft={15}>
        <DefinitionItem term="Target User">
          <Text fontSize={"lg"} key={task?.targetUser.id}>
            {task?.targetUser.firstName} {task?.targetUser.lastName}
          </Text>
          <Text fontSize={"md"} key={task?.targetUser.login}>
            {task?.targetUser.login}
          </Text>
        </DefinitionItem>
        <DefinitionItem term="Role">
          <Text fontSize={"lg"} key={task?.role.id}>
            {task?.role.name} - {task?.role.resource.name}
          </Text>
          <Text fontSize={"md"} key={task?.role.description}>
            {task?.role.description}
          </Text>
        </DefinitionItem>
        <DefinitionItem term="Request Time">
          <Text fontSize={"lg"} key={task?.creationTime}>
            {Moment(task?.creationTime).format("yyyy-MM-DD hh:mm:ss")}
          </Text>
        </DefinitionItem>
        <DefinitionItem term="Operation">
          <Text fontSize={"lg"} key={task?.role.id}>
            {task?.operation === "A" ? "Request" : "Revoke"}
          </Text>
        </DefinitionItem>
      </SimpleGrid>
      <Box alignContent={"flex-end"}>
        <TaskActionButtons task={task!}></TaskActionButtons>
      </Box>
    </Box>
  );
};

export default TaskInfo;
