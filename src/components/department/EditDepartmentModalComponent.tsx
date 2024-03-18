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
  Box,
  HStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert.tsx";
import { useQueryClient } from "@tanstack/react-query";
import OrganizationService from "../../service/organizationService.ts";
import useUsers from "../../hooks/useUsers.ts";
import { User } from "../../entity/User.ts";
import { SingleValue } from "react-select";
import Select from "react-select";
import customStyles from "../../styles/react-select.ts";
import { Organization } from "../../entity/Organization.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  org: Organization;
}

const EditDepartmentModalComponent = ({
  isOpen,
  title,
  onClose,
  org,
}: Props) => {
  const form = useRef(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useUsers();

  const [formData, setFormData] = useState({
    name: org.name,
    company: org.company,
  });

  const [selectedUser, setSelectedUser] = useState<SingleValue<User>>(
    org.manager || null,
  );

  const handleManagerChange = (selectedOption: SingleValue<User>) => {
    setSelectedUser(selectedOption);
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
    OrganizationService.update({
      id: org.id,
      name: formData.name,
      company: formData.company,
      manager: selectedUser || undefined,
    }).then(
      (response) => {
        if (response.data) {
          queryClient.invalidateQueries(["organization"]);
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
            <FormLabel>Company</FormLabel>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            <FormLabel>Manager</FormLabel>
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

export default EditDepartmentModalComponent;
