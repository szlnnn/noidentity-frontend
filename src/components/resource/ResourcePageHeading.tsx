import { useState } from "react";
import { Button, Heading, HStack, useDisclosure } from "@chakra-ui/react";
import CreateResourceModalComponent from "./CreateResourceModalComponent.tsx";

const UserPageHeading = () => {
  const [isResourceCreate, setIsResourceCreate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = () => {
    setIsResourceCreate(true);
    onOpen();
  };
  return (
    <>
      <HStack marginBottom={5} width="100%" justifyContent="space-between">
        <Heading>Manage Resources</Heading>
        <Button
          width="20%"
          colorScheme="teal"
          onClick={() => handleEditClick()}
        >
          Add new Resource
        </Button>
      </HStack>
      {isResourceCreate && (
        <CreateResourceModalComponent
          isOpen={isOpen}
          onClose={onClose}
          title={"Add new Resource"}
        />
      )}
    </>
  );
};

export default UserPageHeading;
