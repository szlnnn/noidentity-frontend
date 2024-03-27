import { Navigate, Outlet, useLocation } from "react-router-dom";
import authService from "../service/authService.ts";
import NavBar from "../components/NavBar.tsx";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import UserProfile from "../components/UserProfile.tsx";
import { jwtDecode } from "jwt-decode";

const PrivateRoutes = () => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  if (user === undefined) {
    return null;
  }

  const isAuthenticated = () => {
    if (!user.token) {
      return false;
    }
    const decodedToken = jwtDecode(user.token);
    if (
      decodedToken === null ||
      decodedToken.exp === null ||
      decodedToken.exp === undefined
    ) {
      return false;
    }
    const currentDate = new Date();
    return decodedToken.exp * 1000 >= currentDate.getTime();
  };

  return isAuthenticated() ? (
    <>
      <NavBar />
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "300px 1fr",
        }}
      >
        <Show above={"lg"}>
          <GridItem area={"aside"} paddingX={5}>
            <UserProfile />
          </GridItem>
        </Show>
        <GridItem w="90%" area={"main"} paddingX={5} paddingY={10}>
          <Outlet />
        </GridItem>
      </Grid>
    </>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
