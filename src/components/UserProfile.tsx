import { Box, Heading, Text, Stack, Image } from "@chakra-ui/react";
import profile_placeholder from "../assets/profile_placeholder.webp";

export interface User {
  login: string;
  firstName: string;
  lastName: string;
  role: string;
}

const UserProfile = (user: User) => {
  return (
    <Box maxW="md" borderRadius="lg" overflow="hidden">
      <Stack direction="column" spacing={4} p={4}>
        <Image src={profile_placeholder} alt="Profile" borderRadius="full" />
        <Box>
          <Heading size="md">
            {user.firstName} {user.lastName}
          </Heading>
          <Text color="gray.500">{user.login}</Text>
        </Box>
      </Stack>

      <Box p={4}>
        <Text>{user.role || "No role available."}</Text>
      </Box>
    </Box>
  );
};

export default UserProfile;
