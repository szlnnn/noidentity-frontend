import { useState } from "react";
import { useUserStore } from "../../../stores/requestUserStore.ts";
import useUsers from "../../../hooks/useUsers.ts";
import {
  Box,
  Button,
  Divider,
  Input,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import useCounterStore from "../../../stores/stepStore.ts";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectUser, removeSelectedUser } = useUserStore();
  const { count, reset } = useCounterStore();
  const { data: users } = useUsers();
  const filteredUsers = users?.filter(
    (user) =>
      searchTerm !== "" &&
      `${user.login}`.toLowerCase() !== "noadmin" &&
      `${user.login}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  if (count != 0) {
    reset();
  }
  const handleRemoveSelectedUser = () => {
    removeSelectedUser();
    setSearchTerm("");
  };
  return (
    <Box p="4" width={"35%"}>
      <VStack spacing="4">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <UnorderedList spacing={3}>
          {filteredUsers?.map((user, index) => (
            <ListItem
              key={index}
              cursor={"pointer"}
              onClick={() => selectUser(user)}
              width="full"
              fontSize={20}
            >
              <Divider orientation="horizontal" />
              {user.firstName} {user.lastName} - {user.login}
            </ListItem>
          ))}
          <Divider orientation="horizontal" />
        </UnorderedList>

        <Button backgroundColor={"#8B4950"} onClick={handleRemoveSelectedUser}>
          Remove Selected User
        </Button>
      </VStack>
    </Box>
  );
};

export default UserSearch;
