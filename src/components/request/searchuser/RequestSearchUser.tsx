import { Box, Divider, HStack } from "@chakra-ui/react";
import UserSearch from "./UserSearch.tsx";
import UserInfo from "./UserInfo.tsx";

const RequestSearchUser = () => {
  return (
    <HStack width={"70%"} height={"350px"} justifyContent={"space-between"}>
      <UserSearch />
      <Divider orientation={"vertical"} />
      <UserInfo />
      <Box />
    </HStack>
  );
};

export default RequestSearchUser;
