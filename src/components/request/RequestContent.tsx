import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import steps from "../constants/steps.ts";
import RequestFooter from "./RequestFooter.tsx";
import { useUserStore } from "../../stores/requestUserStore.ts";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoleStore from "../../stores/requestRightsStore.ts";
import useCounterStore from "../../stores/stepStore.ts";
import RequestService from "../../service/requestService.ts";
import authService from "../../service/authService.ts";

const RequestContent = () => {
  const { selectedUser, removeSelectedUser } = useUserStore();
  const { roles, removeRole } = useRoleStore();
  const { count, increment, decrement, reset } = useCounterStore();
  const navigate = useNavigate();
  const logonUser = authService.getCurrentUser();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const handlePreviousStep = () => {
    const newStep = count - 1;
    if (newStep === -1) {
      removeSelectedUser();
      roles.forEach((role) => removeRole(role.id!));
      reset();
      navigate("/");
    }
    if (newStep === 0) {
      decrement();
      navigate("/request");
    }
    if (newStep === 1) {
      decrement();
      navigate("/request/resource");
    }
  };

  const handleNextStep = () => {
    if (!selectedUser || error) {
      onOpen();
      return count;
    }

    if (count === 3) return 3;

    const newActiveStep = count + 1;
    if (newActiveStep === 1) {
      navigate("/request/resource");
    }
    if (newActiveStep === 2) {
      navigate("/request/confirm");
    }
    if (newActiveStep === 3) {
      RequestService.postRequest(logonUser, selectedUser, roles, []).then(
        (error) => {
          const resMessage =
            (error.data && error.data.message) ||
            error.statusText ||
            error.toString();
          setError(resMessage);
        },
      );
      navigate("/request/success");
    }
    increment();
  };

  return (
    <>
      {count !== 3 && (
        <HStack
          justifyContent={"right"}
          width={"80%"}
          padding={10}
          marginTop={20}
        >
          <Button
            backgroundColor={"#8B4950"}
            onClick={handlePreviousStep}
            padding={5}
          >
            {count === 0 ? "Cancel" : "Previous"}
          </Button>
          <Button
            backgroundColor={"#006969"}
            onClick={handleNextStep}
            padding={5}
          >
            {count === 2 ? "Confirm" : "Next"}
          </Button>
        </HStack>
      )}

      <RequestFooter steps={steps} activeStep={count} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Missing information!
            </AlertDialogHeader>

            <AlertDialogBody>
              Please provide the needed information!
              {error}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RequestContent;
