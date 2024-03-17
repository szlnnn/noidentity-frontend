import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert.tsx";
import ResourceService from "../../service/resourceService.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Resource } from "../../entity/Resource.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  resource: Resource;
}

const UpdateResourceModalComponent = ({
  isOpen,
  title,
  onClose,
  resource,
}: Props) => {
  const form = useRef(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const [azureTenant, setAzureTenant] = useState(
    resource.azureConfig?.tenantId || "",
  );

  const [azureApplication, setAzureApplication] = useState(
    resource.azureConfig?.applicationId || "",
  );
  const [azureSecret, setAzureSecret] = useState(
    resource.azureConfig?.secret || "",
  );

  const [azureScope, setAzureScope] = useState(
    resource.azureConfig?.scope || "",
  );

  const handleTenantChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setAzureTenant(event.target.value);
  };

  const handleApplicationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setAzureApplication(event.target.value);
  };
  const handleSecretChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setAzureSecret(event.target.value);
  };

  const handleScopeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setAzureScope(event.target.value);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ResourceService.update({
      ...resource,
      azureConfig: {
        tenantId: azureTenant,
        applicationId: azureApplication,
        scope: azureScope,
        secret: azureSecret,
      },
    }).then(
      (response) => {
        if (response.data) {
          queryClient.invalidateQueries(["resources"]);
          onClose();
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError(resMessage);
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form ref={form} onSubmit={handleUpdate}>
            <FormControl isDisabled={true}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={resource.name} />
            </FormControl>
            <FormControl isDisabled={true}>
              <FormLabel>Resource Type</FormLabel>
              <Select name="type" value={resource.type} mb={6}>
                <option value="Azure">Azure</option>
                <option value="Offline">Offline</option>
              </Select>
            </FormControl>

            <FormControl isDisabled={resource.type === "Offline"}>
              <FormLabel>Azure Tenant Id</FormLabel>
              <Input
                type="text"
                name="azureTenantId"
                value={azureTenant}
                onChange={handleTenantChange}
              />
              <FormLabel>Azure Application Id</FormLabel>
              <Input
                type="text"
                name="azureApplicationId"
                value={azureApplication}
                onChange={handleApplicationChange}
              />
              <FormLabel>Azure Scope</FormLabel>
              <Input
                type="text"
                name="azureScope"
                value={azureScope}
                onChange={handleScopeChange}
              />
              <FormLabel>Secret</FormLabel>
              <Input
                type="text"
                name="azureSecret"
                value={azureSecret}
                onChange={handleSecretChange}
              />
            </FormControl>
            <HStack marginTop={3}>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setError("");
                  onClose();
                }}
              >
                Cancel
              </Button>
            </HStack>
          </form>
          <Box padding={2} onClick={() => setError("")}>
            {error && <ErrorAlert>{error}</ErrorAlert>}
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateResourceModalComponent;
