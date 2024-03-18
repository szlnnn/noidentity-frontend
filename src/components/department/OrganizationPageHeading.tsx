import { useState } from "react";
import { Button, Heading, HStack, useDisclosure } from "@chakra-ui/react";
import CreateDepartmentModalComponent from "./CreateDepartmentModalComponent.tsx";

const OrganizationPageHeading = () => {
  const [isOrganizationCreate, setIsOrganizationCreate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = () => {
    setIsOrganizationCreate(true);
    onOpen();
  };
  return (
    <>
      <HStack marginBottom={5} width="100%" justifyContent="space-between">
        <Heading>Manage Organizations</Heading>
        <Button
          width="20%"
          colorScheme="teal"
          onClick={() => handleEditClick()}
        >
          Add new Organization
        </Button>
      </HStack>
      {isOrganizationCreate && (
        <CreateDepartmentModalComponent
          isOpen={isOpen}
          onClose={onClose}
          title={"Add new Organization"}
        />
      )}
    </>
  );
};

export default OrganizationPageHeading;
