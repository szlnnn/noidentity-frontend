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
import { useQueryClient } from "@tanstack/react-query";
import UserService from "../../service/userService.ts";
import { User } from "../../entity/User.ts";
import Moment from "moment";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  user: User;
}

const RegisterUserModalComponent = ({
  isOpen,
  title,
  onClose,
  user,
}: Props) => {
  const form = useRef(null);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserService.update(updatedUser).then(
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
            <FormControl isReadOnly={true}>
              <FormLabel>Login</FormLabel>
              <Input
                type="text"
                name="login"
                value={updatedUser?.login}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Start Date</FormLabel>
              <Input
                type={"date"}
                name={"startDate"}
                value={Moment(updatedUser?.startDate).format("yyyy-MM-DD")}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>End Date</FormLabel>
              <Input
                type={"date"}
                name={"endDate"}
                value={Moment(updatedUser?.endDate).format("yyyy-MM-DD")}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={updatedUser?.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={updatedUser?.lastName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                name="email"
                value={updatedUser?.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select
                placeholder="Select role"
                name="role"
                value={updatedUser?.role}
                onChange={handleChange}
                mb={6}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </Select>
            </FormControl>
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
