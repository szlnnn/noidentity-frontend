import { Box, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import RequestService from "../../service/requestService.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Task } from "../../entity/Task.ts";
import authService from "../../service/authService.ts";
import ErrorAlert from "../alerts/ErrorAlert.tsx";
import { useNavigate } from "react-router-dom";

interface Props {
  task: Task;
}

const TaskActionButtons = ({ task }: Props) => {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleApprove = () => {
    RequestService.approveTask(task.id!).then(
      (response) => {
        if (response.data) {
          queryClient.invalidateQueries(["tasks", user.id]);
          navigate("/tasks/success");
        }
      },
      (error) => {
        const resMessage =
          (error.data && error.data.message) ||
          error.statusText ||
          error.toString();
        setError(resMessage);
      },
    );
  };

  const handleReject = () => {
    RequestService.rejectTask(task.id!).then(
      (response) => {
        if (response.data) {
          queryClient.invalidateQueries(["tasks", user.id]);
          navigate("/tasks/success");
        }
      },
      (error) => {
        const resMessage =
          (error.data && error.data.message) ||
          error.statusText ||
          error.toString();
        setError(resMessage);
      },
    );
  };

  return (
    <HStack width={"80%"} padding={10} justifyContent={"right"}>
      <Button backgroundColor={"#8B4950"} onClick={handleReject} padding={5}>
        Reject
      </Button>
      <Button backgroundColor={"#006969"} onClick={handleApprove} padding={5}>
        Approve
      </Button>
      <Box padding={2} onClick={() => setError("")}>
        {error && <ErrorAlert>{error}</ErrorAlert>}
      </Box>
    </HStack>
  );
};

export default TaskActionButtons;
