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
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import AuthService from "../../service/authService.ts";
import ErrorAlert from "../alerts/ErrorAlert.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { SingleValue } from "react-select";
import Select from "react-select";
import { Organization } from "../../entity/Organization.ts";
import useOrganizations from "../../hooks/useOrganizations.ts";
import customStylesOrganization from "../../styles/react-select-org.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const RegisterUserModalComponent = ({ isOpen, title, onClose }: Props) => {
  const form = useRef(null);
  const [error, setError] = useState("");
  const [selectedOrganization, setSelectedOrganization] =
    useState<SingleValue<Organization>>(null);
  const queryClient = useQueryClient();

  const { data: orgs, isLoading } = useOrganizations();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    startDate: "",
    endDate: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleOrganizationChange = (
    selectedOption: SingleValue<Organization>,
  ) => {
    setSelectedOrganization(selectedOption);
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
    AuthService.register(
      {
        login: formData.login,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        role: formData.role,
        organization: selectedOrganization || undefined,
      },
      formData.password,
      formData.role,
    ).then(
      (response) => {
        if (response.data) {
          queryClient.invalidateQueries(["users"]);
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
              <FormLabel>Login</FormLabel>
              <Input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Start Date</FormLabel>
              <Input
                type={"date"}
                name={"startDate"}
                value={formData.startDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>End Date</FormLabel>
              <Input
                type={"date"}
                name={"endDate"}
                value={formData.endDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                mb={4}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <ChakraSelect
                placeholder={"Select Role"}
                name="role"
                value={formData.role}
                onChange={handleChange}
                mb={6}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </ChakraSelect>
            </FormControl>
            <FormLabel>Organization</FormLabel>

            <Select
              options={orgs}
              styles={customStylesOrganization}
              value={selectedOrganization}
              onChange={handleOrganizationChange}
              placeholder="Select an organization"
              isLoading={isLoading}
              isClearable={true}
              getOptionLabel={(option) => `${option.name} : ${option.company}`}
            />

            <HStack marginTop={3}>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button
                variant="ghost"
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

export default RegisterUserModalComponent;
