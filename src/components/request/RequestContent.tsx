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
  useSteps,
} from "@chakra-ui/react";
import steps from "../constants/steps.ts";
import RequestFooter from "./RequestFooter.tsx";
import RequestSearchUser from "./searchuser/RequestSearchUser.tsx";
import { useUserStore } from "../../stores/requestUser.ts";
import { useRef } from "react";

const RequestContent = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const selectedUser = useUserStore((state) => state.selectedUser);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const handlePreviousStep = () => {
    if (activeStep > 0) return setActiveStep(activeStep - 1);
    else return 0;
  };

  const handleNextStep = () => {
    if (!selectedUser) {
      onOpen();
      return activeStep;
    }
    if (activeStep === 3) return 3;
    else return setActiveStep(activeStep + 1);
  };

  return (
    <>
      {activeStep === 0 && <RequestSearchUser />}
      <HStack justifyContent={"right"} width={"80%"} padding={10}>
        <Button
          backgroundColor={"#8B4950"}
          onClick={handlePreviousStep}
          padding={5}
        >
          Previous
        </Button>
        <Button
          backgroundColor={"#006969"}
          onClick={handleNextStep}
          padding={5}
        >
          Next
        </Button>
      </HStack>
      <RequestFooter steps={steps} activeStep={activeStep} />

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
