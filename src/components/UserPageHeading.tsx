import { useState } from "react";
import { Button, Heading, HStack, useDisclosure } from "@chakra-ui/react";
import RegisterUserModalComponent from "./RegisterUserModalComponent.tsx";

const UserPageHeading = () => {
  const [isUserCreate, setIsUserCreate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = () => {
    setIsUserCreate(true);
    onOpen();
  };
  return (
    <>
      <HStack marginBottom={5} width="100%" justifyContent="space-between">
        <Heading>Manage Users</Heading>
        <Button
          width="20%"
          colorScheme="teal"
          onClick={() => handleEditClick()}
        >
          Register new user
        </Button>
      </HStack>
      {isUserCreate && (
        <RegisterUserModalComponent
          isOpen={isOpen}
          onClose={onClose}
          title={"Create new user"}
        />
      )}
    </>
  );
};

export default UserPageHeading;
