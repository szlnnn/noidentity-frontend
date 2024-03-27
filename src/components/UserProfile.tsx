import { Box, Heading, Text, Stack, Avatar } from "@chakra-ui/react";
import Moment from "moment";
import authService from "../service/authService.ts";

const UserProfile = () => {
  const user = authService.getCurrentUser();
  console.log(user);
  return (
    <Box
      maxW="md"
      borderRadius="lg"
      overflow="hidden"
      marginTop={37}
      borderRightWidth={"2px"}
    >
      <Stack direction="column" spacing={4} p={4}>
        <Avatar
          bg="gray.400"
          name={user.firstName + " " + user.lastName}
          size="2xl"
        />
        <Box>
          <Text fontSize={"xl"} color="gray.400">
            Name{" "}
          </Text>
          <Heading size="md">
            {user.firstName} {user.lastName}
          </Heading>
        </Box>
        <Box>
          <Text fontSize={"xl"} color="gray.400">
            Login{" "}
          </Text>
          <Heading size="md">{user.login}</Heading>
        </Box>
        <Box>
          <Text fontSize={"xl"} color="gray.400">
            Email{" "}
          </Text>
          <Heading size="md">{user.email}</Heading>
        </Box>
        <Box>
          <Text fontSize={"xl"} color="gray.400">
            Start Date{" "}
          </Text>
          <Heading size="md">
            {Moment(user?.startDate).format("yyyy-MM-DD hh:mm")}
          </Heading>
        </Box>
        <Box>
          <Text fontSize={"xl"} color="gray.400">
            End Date{" "}
          </Text>
          <Heading size="md">
            {Moment(user?.endDate).format("yyyy-MM-DD hh:mm")}
          </Heading>
        </Box>
        <Box>
          <Text fontSize={"xl"} color="gray.400">
            Organization{" "}
          </Text>
          <Heading size="md">{user.organization?.name}</Heading>
        </Box>
        <Box>
          <Text fontSize={"xl"} color="gray.400">
            Manager{" "}
          </Text>
          <Heading size="md">
            {user.manager.firstName} {user.manager.lastName}
          </Heading>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserProfile;
