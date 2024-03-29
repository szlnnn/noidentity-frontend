import { ChangeEvent, useRef, useState } from "react";
import { User } from "../../entity/User.ts";
import useUsers from "../../hooks/useUsers.ts";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  Text,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import UserSearchResultModal from "./UserSearchResultModal.tsx";

const UserQuickSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: users } = useUsers();
  const [inputValue, setInputValue] = useState("");
  const [filteredResults, setFilteredResults] = useState<User[] | undefined>(
    [],
  );
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3) {
      const filteredData = users?.filter((item) =>
        item.login.toLowerCase().includes(value.toLowerCase()),
      );

      setFilteredResults(filteredData);
      setIsResultOpen(true);
    } else {
      setFilteredResults([]);
      setIsResultOpen(false);
    }
  };
  const afterClose = () => {
    setSelectedUser(undefined);
    onClose();
  };

  const handleClick = (user: User) => {
    setSelectedUser(user);
    setIsResultOpen(false);
    setInputValue("");
    onOpen();
  };

  return (
    <>
      <Box width={"25%"} justifyContent={"right"}>
        <Popover
          isOpen={isResultOpen && filteredResults && filteredResults.length > 0}
          onClose={() => setIsResultOpen(false)}
          initialFocusRef={inputRef}
          placement={"bottom-start"}
          matchWidth={true}
        >
          <PopoverTrigger>
            <InputGroup>
              <InputLeftElement children={<BsSearch />} />
              <Input
                ref={inputRef}
                borderRadius={20}
                placeholder="Search users...."
                variant="filled"
                value={inputValue}
                onChange={handleInputChange}
              />
            </InputGroup>
          </PopoverTrigger>
          <PopoverContent p={4}>
            <List spacing={2}>
              {filteredResults?.map((user) => (
                <ListItem key={user.id} _hover={{ cursor: "pointer" }}>
                  <Box p={2} cursor="pointer" onClick={() => handleClick(user)}>
                    <Text fontWeight="bold">
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text fontSize="sm">{user.login}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {user.email}
                    </Text>
                  </Box>
                  <Divider orientation={"horizontal"} />
                </ListItem>
              ))}
            </List>
          </PopoverContent>
        </Popover>
      </Box>
      {selectedUser && (
        <UserSearchResultModal
          isOpen={isOpen}
          onClose={afterClose}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default UserQuickSearch;
