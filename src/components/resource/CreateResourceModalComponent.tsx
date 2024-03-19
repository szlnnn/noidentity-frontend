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
  Select as ChakraSelect,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert.tsx";
import ResourceService from "../../service/resourceService.ts";
import { useQueryClient } from "@tanstack/react-query";
import customStyles from "../../styles/react-select.ts";
import Select, { SingleValue } from "react-select";
import { User } from "../../entity/User.ts";
import useUsers from "../../hooks/useUsers.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const CreateResourceModalComponent = ({ isOpen, title, onClose }: Props) => {
  const form = useRef(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<SingleValue<User>>(null);
  const { data: users, isLoading } = useUsers();

  const handleManagerChange = (selectedOption: SingleValue<User>) => {
    setSelectedUser(selectedOption);
  };
  const [formData, setFormData] = useState({
    name: "",
    type: "Offline",
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
      appOwner: selectedUser || undefined,
    }).then(
      (response) => {
        if (response.data) {
          setFormData({
            ...formData,
            name: "",
            type: "Offline",
            azureTenantId: "",
            azureApplicationId: "",
            azureScope: "",
            azureSecret: "",
          });
          setSelectedUser(null);
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
            <FormControl isRequired={true}>
              <FormLabel>Application Owner</FormLabel>
              <Select
                options={users?.filter((u) => u.login !== "noadmin")}
                styles={customStyles}
                value={selectedUser}
                onChange={handleManagerChange}
                placeholder="Select a manager..."
                isLoading={isLoading}
                isClearable={true}
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName} : ${option.login}`
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Resource Type</FormLabel>
              <ChakraSelect
                name="type"
                value={formData.type}
                onChange={handleChangeType}
                mb={6}
              >
                <option value="Azure">Azure</option>
                <option value="Offline">Offline</option>
              </ChakraSelect>
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
              <FormLabel>Azure Secret</FormLabel>
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
