import useTasks from "../../hooks/useTasks.ts";
import authService from "../../service/authService.ts";
import { Box, Divider, List, ListItem, Spinner } from "@chakra-ui/react";
import TaskListElement from "./TaskListElement.tsx";
import { Task } from "../../entity/Task.ts";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const user = authService.getCurrentUser();

  const navigate = useNavigate();
  const { data: tasks, isLoading } = useTasks(user.id);

  const handleClick = (task: Task) => {
    navigate("/tasks/" + task.id);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Box width={"55%"} overflowY="scroll" overflowX={"hidden"}>
        <List spacing={6}>
          {tasks?.map((task, index) => (
            <ListItem
              key={index}
              cursor={"pointer"}
              onClick={() => handleClick(task)}
              width="full"
              fontSize={20}
              marginTop={"5px"}
            >
              <Divider
                orientation="horizontal"
                padding={"5px"}
                marginBottom={5}
              />
              <TaskListElement task={task} />
            </ListItem>
          ))}
          <Divider orientation="horizontal" />
        </List>
      </Box>
    </>
  );
};

export default TaskList;
