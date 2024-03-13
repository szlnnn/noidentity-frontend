import UserList from "../components/UserList.tsx";
import { VStack } from "@chakra-ui/react";
import UserPageHeading from "../components/UserPageHeading.tsx";

const UserEditPage = () => {
  return (
    <>
      <VStack padding={5} width={"60%"}>
        <UserPageHeading></UserPageHeading>
        <UserList></UserList>
      </VStack>
    </>
  );
};

export default UserEditPage;
