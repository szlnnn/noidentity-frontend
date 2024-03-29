import UserRequestsTable from "../components/user-requests/UserRequestsTable.tsx";
import { Heading, VStack } from "@chakra-ui/react";

const UserRequestsPage = () => {
  return (
    <>
      <Heading marginBottom={10} justifyContent={"left"}>
        My Requests
      </Heading>
      <VStack>
        <UserRequestsTable></UserRequestsTable>;
      </VStack>
    </>
  );
};

export default UserRequestsPage;
