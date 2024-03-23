import { Box, Grid, GridItem } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Grid gap={4} templateColumns="repeat(3, 1fr)">
        <Link to={"/register"}>
          <GridItem>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              Register User
            </Box>
          </GridItem>
        </Link>
        <GridItem>
          <Link to={"/resources"}>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              Manage Resources and Roles
            </Box>
          </Link>
        </GridItem>
        <GridItem>
          <Link to={"/departments"}>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              Manage Organizations
            </Box>
          </Link>
        </GridItem>
        <GridItem>
          <Link to={"/request"}>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              Request Rights
            </Box>
          </Link>
        </GridItem>
        <GridItem>
          <Link to={"/tasks"}>
            <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
              My Tasks
            </Box>
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
