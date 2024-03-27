import { Grid, GridItem, Heading } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { VscFileSubmodule } from "react-icons/vsc";
import { SiAwsorganizations } from "react-icons/si";
import { TbFolderPlus } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { PiFolderUser } from "react-icons/pi";

import MenuItemContainer from "../components/MenuItemContainer.tsx";
import authService from "../service/authService.ts";

const HomePage = () => {
  const userRole = authService.getCurrentUser().role;

  return (
    <>
      <Grid gap={4} templateColumns="repeat(3, 1fr)">
        {userRole === "ADMIN" && (
          <GridItem>
            <Link to={"/register"}>
              <MenuItemContainer>
                <Heading>Manage Users</Heading>
                <FaUserGroup size={80} color="#006969" />
              </MenuItemContainer>
            </Link>
          </GridItem>
        )}

        {userRole === "ADMIN" && (
          <GridItem>
            <Link to={"/resources"}>
              <MenuItemContainer>
                <Heading>Manage Roles</Heading>
                <VscFileSubmodule size={80} color={"#006969"} />
              </MenuItemContainer>
            </Link>
          </GridItem>
        )}
        {userRole === "ADMIN" && (
          <GridItem>
            <Link to={"/departments"}>
              <MenuItemContainer>
                <Heading>Manage Organizations</Heading>
                <SiAwsorganizations size={80} color={"#006969"} />
              </MenuItemContainer>
            </Link>
          </GridItem>
        )}
        <GridItem>
          <Link to={"/request"}>
            <MenuItemContainer>
              <Heading>Request Rights</Heading>
              <TbFolderPlus size={80} color={"#006969"} />
            </MenuItemContainer>
          </Link>
        </GridItem>
        <GridItem>
          <Link to={"/tasks"}>
            <MenuItemContainer>
              <Heading>Tasks</Heading>
              <FaTasks size={80} color={"#006969"} />
            </MenuItemContainer>
          </Link>
        </GridItem>
        <GridItem>
          <Link to={"/my-roles"}>
            <MenuItemContainer>
              <Heading>My Roles</Heading>
              <PiFolderUser size={80} color={"#006969"} />
            </MenuItemContainer>
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
