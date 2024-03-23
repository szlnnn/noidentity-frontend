import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logoSmall from "../assets/logosmall.webp";
import AuthService from "../service/authService.ts";
import ErrorAlert from "./alerts/ErrorAlert.tsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    setMessage("");
    AuthService.login(username, password).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      },
    );
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={8}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          handleLogin();
        }
      }}
    >
      <VStack>
        <Image src={logoSmall} height={66} width={350} />
        <Heading mb={4}>Login</Heading>
      </VStack>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="teal" mt={4} onClick={handleLogin}>
        Login
      </Button>
      <Box padding={2}>{message && <ErrorAlert>{message}</ErrorAlert>}</Box>
    </Box>
  );
};

export default Login;
