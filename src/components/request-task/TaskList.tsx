import useTasks from "../../hooks/useTasks.ts";
import authService from "../../service/authService.ts";
import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Task } from "../../entity/Task.ts";
import { useNavigate } from "react-router-dom";
import Moment from "moment";
import { IoAdd } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";

const TaskList = () => {
  const user = authService.getCurrentUser();

  const navigate = useNavigate();
  const { data: tasks, isLoading } = useTasks(user.id);

  const handleClick = (task: Task) => {
    navigate("/tasks/" + task.id);
  };

  const getBGColor = (taskOperation: string) => {
    if (taskOperation === "A") {
      return "#006969";
    } else {
      return "#8B4950";
    }
  };

  const getTaskLabel = (task: string) => {
    if (task === "manager") {
      return "Manager";
    } else {
      return "Application Owner";
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Box width={"55%"} overflowY="scroll" overflowX={"hidden"}>
        <Table variant="simple" size="md" borderWidth="1px">
          <Thead>
            <Tr>
              <Th>Operation</Th>
              <Th>Role</Th>
              <Th>User</Th>
              <Th>Time</Th>
              <Th>Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks?.map((task) => (
              <Tr
                key={task.id}
                onClick={() => handleClick(task)}
                cursor={"pointer"}
                bgColor={getBGColor(task.operation)}
              >
                <Td>
                  {task.operation === "A" ? (
                    <IoAdd size={30} />
                  ) : (
                    <FaMinus size={30} />
                  )}
                </Td>
                <Td>
                  {" "}
                  {task.role.resource.name} | {task.role.name}
                </Td>
                <Td>
                  {task.targetUser.firstName} {task.targetUser.lastName}
                </Td>
                <Td>{Moment(task.creationTime).format("yyyy-MM-DD")}</Td>
                <Td>{getTaskLabel(task.type)} Task</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default TaskList;
