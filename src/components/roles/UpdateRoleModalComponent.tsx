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
import { useRef, useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Role } from "../../entity/Role.ts";
import RoleService from "../../service/roleService.ts";
import Moment from "moment/moment";
import useResourceAttributeValues from "../../hooks/useResourceAttributeValues.ts";
import Select, { SingleValue } from "react-select";
import { ResourceAttributeValue } from "../../entity/ResourceAttributeValue.ts";
import customStylesRAV from "../../styles/react-select-res-attr-value.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  role: Role;
}

const UpdateRoleModalComponent = ({ isOpen, title, onClose, role }: Props) => {
  const form = useRef(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const [checked, setChecked] = useState(role.active);

  const { data: values, isLoading } = useResourceAttributeValues();

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const [formData, setFormData] = useState({
    name: role.name,
    type: role.type,
    description: role.description,
    created: role.created,
    resourceRoleId: role.resourceRoleId,
  });

  const [selectedRAV, setSelectedRAV] = useState<
    SingleValue<ResourceAttributeValue>
  >(values?.find((value) => value.identifier === role.resourceRoleId) || null);

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

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    let resourceRoleId = formData.resourceRoleId;
    if (selectedRAV) {
      resourceRoleId = selectedRAV.identifier;
    }
    e.preventDefault();
    RoleService.update({
      ...role,
      name: formData.name,
      type: formData.type,
      description: formData.description,
      created: formData.created,
      resourceRoleId: resourceRoleId,
      active: checked,
    }).then(
      (response) => {
        if (response.data) {
          queryClient.invalidateQueries(["roles", role.resource.id]);
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
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <ChakraSelect
                name="type"
                value={formData.type}
                mb={6}
                onChange={handleChange}
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
                value={Moment(formData.created).format("yyyy-MM-DD")}
                onChange={handleChange}
              />
              {role.resource.type !== "Azure" && (
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
              {role.resource.type === "Azure" && (
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
                    placeholder={role.resourceRoleId}
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

export default UpdateRoleModalComponent;
