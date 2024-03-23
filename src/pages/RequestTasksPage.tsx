import { Heading, HStack } from "@chakra-ui/react";
import TaskList from "../components/request-task/TaskList.tsx";
import { Outlet } from "react-router-dom";

const RequestTasksPage = () => {
  return (
    <>
      <Heading>Open Tasks</Heading>
      <HStack justifyContent={"space-around"}>
        <TaskList></TaskList>
        <Outlet />
      </HStack>
    </>
  );
};

export default RequestTasksPage;
