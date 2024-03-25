import { Box, Flex, Image, Spacer, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import logoSmall from "../assets/logosmall.webp";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../service/authService.ts";
import useCounterStore from "../stores/stepStore.ts";
import useRoleStore from "../stores/requestRightsStore.ts";
import { useUserStore } from "../stores/requestUserStore.ts";
import useRevokeRoleStore from "../stores/revokeRightsStore.ts";

const Navbar = () => {
  const navigate = useNavigate();
  const { reset } = useCounterStore();
  const { clearStorage } = useRoleStore();
  const { removeSelectedUser } = useUserStore();
  const { clearRevokedRolesStorage } = useRevokeRoleStore();
  const handleLogout = () => {
    AuthService.logout();
    reset();
    clearStorage();
    removeSelectedUser();
    clearRevokedRolesStorage();
    navigate("/login");
  };

  return (
    <Box p={1} bg="gray.700">
      <Flex align="center">
        <Link to={"/"}>
          <Image src={logoSmall} height={66} width={350} />
        </Link>
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
