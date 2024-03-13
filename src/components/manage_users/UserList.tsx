import { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { User } from "../../entity/User.ts";
import useUsers from "../../hooks/useUsers.ts";
import EditUserModalComponent from "./EditUserModalComponent.tsx";
import Moment from "moment/moment";

const UserList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { data: users } = useUsers();
  const handleEditClick = (user: User) => {
    setCurrentUser(user);
    onOpen();
  };

  const afterClose = () => {
    setCurrentUser(null);
    onClose();
  };

  return (
    <Box>
      <Table variant="simple" size="md" borderWidth="1px">
        <Thead>
          <Tr>
            <Th>Login</Th>
            <Th>Email</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>ID</Th>
            <Th>Role</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.login}</Td>
              <Td>{user.email}</Td>
              <Td>{user.firstName}</Td>
              <Td>{user.lastName}</Td>
              <Td>{Moment(user?.startDate).format("yyyy-MM-DD")}</Td>
              <Td>{Moment(user?.endDate).format("yyyy-MM-DD")}</Td>
              <Td>{user.id}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {currentUser && (
        <EditUserModalComponent
          isOpen={isOpen}
          onClose={afterClose}
          title={"Edit user data"}
          user={currentUser}
        />
      )}
    </Box>
  );
};

export default UserList;
