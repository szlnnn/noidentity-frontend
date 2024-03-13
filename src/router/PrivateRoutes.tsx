import { Navigate, Outlet, useLocation } from "react-router-dom";
import authService from "../service/authService.ts";
import NavBar from "../components/NavBar.tsx";
import { Box, Flex } from "@chakra-ui/react";
import UserProfile from "../components/UserProfile.tsx";

const PrivateRoutes = () => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  if (user === undefined) {
    return null;
  }

  return user.token ? (
    <Box>
      <NavBar />
      <Box padding={5}>
        <Flex align="center">
          <Box w="10%" marginRight={10}>
            <UserProfile
              login={user.login}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              endDate={user.endDate}
              startDate={user.startDate}
            />
          </Box>
          <Outlet />
        </Flex>
      </Box>
    </Box>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
