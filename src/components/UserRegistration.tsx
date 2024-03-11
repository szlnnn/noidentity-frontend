import { Flex, Box, Heading, Input, Select, Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import AuthService from "../service/authService.ts";
import ErrorAlert from "./ErrorAlert.tsx";
import SuccessAlert from "./SuccessAlert.tsx";

const UserRegistration = () => {
  const form = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    role: "user",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(true);

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
      formData.login,
      formData.firstName,
      formData.password,
      formData.lastName,
      formData.role,
    ).then(
      (response) => {
        setIsSuccess(true);
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
    <Flex align="center" justify="center">
      <Box
        p={8}
        maxWidth="700px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={4}>User Registration</Heading>
        <form onSubmit={handleRegister} ref={form}>
          <Input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            mb={4}
          />
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            mb={4}
          />
          <Input
            type="text"
            placeholder="Login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            mb={4}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            mb={4}
          />
          <Select
            placeholder="Select role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            mb={6}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
          <Button type="submit" colorScheme="teal" width="full">
            Register
          </Button>
          <Box
            padding={2}
            onClick={() => setError("")}
            //  visibility={isVisible ? "visible" : "hidden"}
          >
            {error && isVisible && <ErrorAlert>{error}</ErrorAlert>}
          </Box>
          <Box
            padding={2}
            onClick={() => setIsSuccess(false)}
            // visibility={isVisible ? "visible" : "hidden"}
          >
            {isSuccess && isVisible && (
              <SuccessAlert>{"Successfully created a new user"}</SuccessAlert>
            )}
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default UserRegistration;
