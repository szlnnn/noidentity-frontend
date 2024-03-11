import { Box, Flex, Image, Spacer, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import logoSmall from "../assets/logosmall.webp";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/authService.ts";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <Box p={1} bg="gray.700">
      <Flex align="center">
        <Image src={logoSmall} height={66} width={350} />
        <Spacer />

        <Button
          colorScheme="teal"
          rightIcon={<FiLogOut />}
          onClick={handleLogout}
          variant="ghost"
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
