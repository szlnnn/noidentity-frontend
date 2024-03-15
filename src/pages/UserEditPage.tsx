import UserList from "../components/manage_users/UserList.tsx";
import { VStack } from "@chakra-ui/react";
import UserPageHeading from "../components/manage_users/UserPageHeading.tsx";

const UserEditPage = () => {
  return (
    <>
      <VStack padding={5}>
        <UserPageHeading></UserPageHeading>
        <UserList></UserList>
      </VStack>
    </>
  );
};

export default UserEditPage;
