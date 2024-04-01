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
  Checkbox,
} from "@chakra-ui/react";
import Select, { SingleValue } from "react-select";

import { useRef, useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert.tsx";
import { useQueryClient } from "@tanstack/react-query";
import RoleService from "../../service/roleService.ts";
import { Resource } from "../../entity/Resource.ts";

import { ResourceAttributeValue } from "../../entity/ResourceAttributeValue.ts";
import customStylesRAV from "../../styles/react-select-res-attr-value.ts";
import useResourceAttributeValues from "../../hooks/useResourceAttributeValues.ts";
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

  const { data: values, isLoading } = useResourceAttributeValues();

  const [formData, setFormData] = useState({
    name: "",
    type: "ApplicationRole",
    description: "",
    created: "",
    resourceRoleId: "",
  });

  const [selectedRAV, setSelectedRAV] =
    useState<SingleValue<ResourceAttributeValue>>(null);

  const [checked, setChecked] = useState(true);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleRAVChange = (
    selectedOption: SingleValue<ResourceAttributeValue>,
  ) => {
    setSelectedRAV(selectedOption);
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
    let resourceRoleId = formData.resourceRoleId;
    if (selectedRAV) {
      resourceRoleId = selectedRAV.identifier;
    }
    e.preventDefault();
    RoleService.create({
      name: formData.name,
      type: formData.type,
      active: checked,
      created: formData.created,
      description: formData.description,
      resource: resource,
      resourceRoleId: resourceRoleId,
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
          queryClient.invalidateQueries(["roles", resource.id]);
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
              <ChakraSelect
                name="type"
                value={formData.type}
                onChange={handleChange}
                mb={6}
              >
                <option value="Licence">Licence</option>
                <option value="ApplicationRole">ApplicationRole</option>
              </ChakraSelect>
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
                defaultChecked={checked}
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
              {resource.type !== "Azure" && (
                <FormControl>
                  <FormLabel>Resource Role Object Id</FormLabel>
                  <Input
                    type="text"
                    name="resourceRoleId"
                    value={formData.resourceRoleId}
                    onChange={handleChange}
                  />
                </FormControl>
              )}
              {resource.type === "Azure" && (
                <FormControl>
                  <FormLabel>Resource Role Object</FormLabel>
                  <Select
                    options={values?.filter(
                      (value: ResourceAttributeValue) =>
                        value.type === formData.type && value.managed,
                    )}
                    styles={customStylesRAV}
                    value={selectedRAV}
                    onChange={handleRAVChange}
                    isLoading={isLoading}
                    placeholder="Select a resource role"
                    isClearable={true}
                    getOptionLabel={(option) =>
                      `${option.name} : ${option.identifier}`
                    }
                  />
                </FormControl>
              )}
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
