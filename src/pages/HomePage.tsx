import { Box, Grid, GridItem } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Grid w="70%" gap={4} templateColumns="repeat(3, 1fr)">
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
              Menu Item 2
            </Box>
          </Link>
        </GridItem>
        <GridItem>
          <Box p={4} borderWidth="1px" borderRadius="md" textAlign="center">
            Menu Item 3
          </Box>
        </GridItem>
        {/* Add more menu items as needed */}
      </Grid>
    </>
  );
};

export default HomePage;
