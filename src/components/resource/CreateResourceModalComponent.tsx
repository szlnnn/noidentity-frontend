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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const CreateResourceModalComponent = ({ isOpen, title, onClose }: Props) => {
  const form = useRef(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    azureTenantId: "",
    azureApplicationId: "",
    azureScope: "",
    azureSecret: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeType = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.value === "Offline") {
      setFormData({
        ...formData,
        type: e.target.value,
        azureTenantId: "",
        azureApplicationId: "",
        azureScope: "",
        azureSecret: "",
      });
    } else {
      setFormData({
        ...formData,
        type: e.target.value,
      });
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ResourceService.create({
      name: formData.name,
      type: formData.type,
      azureConfig: {
        tenantId: formData.azureTenantId,
        applicationId: formData.azureApplicationId,
        scope: formData.azureScope,
        secret: formData.azureSecret,
      },
    }).then(
      (response) => {
        if (response.data) {
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
          <form ref={form} onSubmit={handleRegister}>
            <FormControl isRequired={true}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Resource Type</FormLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChangeType}
                mb={6}
              >
                <option value="Azure">Azure</option>
                <option value="Offline">Offline</option>
              </Select>
            </FormControl>

            <FormControl isDisabled={formData.type === "Offline"}>
              <FormLabel>Azure Tenant Id</FormLabel>
              <Input
                type="text"
                name="azureTenantId"
                value={formData.azureTenantId}
                onChange={handleChange}
              />
              <FormLabel>Azure Application Id</FormLabel>
              <Input
                type="text"
                name="azureApplicationId"
                value={formData.azureApplicationId}
                onChange={handleChange}
              />
              <FormLabel>Azure Scope</FormLabel>
              <Input
                type="text"
                name="azureScope"
                value={formData.azureScope}
                onChange={handleChange}
              />
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="azureSecret"
                value={formData.azureSecret}
                onChange={handleChange}
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

export default CreateResourceModalComponent;
