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
  Checkbox,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert.tsx";
import { useQueryClient } from "@tanstack/react-query";
import RoleService from "../../service/roleService.ts";
import { Resource } from "../../entity/Resource.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  resource: Resource;
}

const CreateRoleModalComponent = ({
  isOpen,
  title,
  onClose,
  resource,
}: Props) => {
  const form = useRef(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    type: "ApplicationRole",
    description: "",
    created: "",
    resourceRoleId: "",
  });

  const [checked, setChecked] = useState(true);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    RoleService.create({
      name: formData.name,
      type: formData.type,
      active: checked,
      created: formData.created,
      description: formData.description,
      resource: resource,
      resourceRoleId: formData.resourceRoleId,
    }).then(
      (response) => {
        if (response.data) {
          setFormData({
            ...formData,
            name: "",
            type: "ApplicationRole",
            description: "",
            created: "",
            resourceRoleId: "",
          });
          setChecked(true);
          queryClient.invalidateQueries(["roles"]);
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
              <FormLabel>Role Type</FormLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                mb={6}
              >
                <option value="Licence">Licence</option>
                <option value="ApplicationRole">ApplicationRole</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <Checkbox
                marginTop={3}
                marginBottom={3}
                type="checkbox"
                name="active"
                checked={checked}
                onChange={handleCheckboxChange}
              >
                Active
              </Checkbox>
              <FormLabel>Created</FormLabel>
              <Input
                type="date"
                name="created"
                value={formData.created}
                onChange={handleChange}
              />
              <FormLabel>Resource Role Object Id</FormLabel>
              <Input
                type="text"
                name="resourceRoleId"
                value={formData.resourceRoleId}
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

export default CreateRoleModalComponent;
