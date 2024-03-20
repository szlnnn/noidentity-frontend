import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useUserStore } from "../../../stores/requestUser.ts";
import Moment from "moment/moment";

const UserInfo = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  return (
    <>
      {selectedUser && (
        <Box maxW="md" borderRadius="lg" overflow="hidden" p={5}>
          <Heading>Selected User Info </Heading>

          <Stack direction="column" spacing={4} p={4}>
            <Box>
              <Heading size="md">Login</Heading>
              <Text color="gray.500" fontSize={"lg"}>
                {selectedUser?.firstName} {selectedUser?.lastName}
              </Text>
            </Box>
            <Box>
              <Heading size="md">Login</Heading>
              <Text color="gray.500" fontSize={"lg"}>
                {selectedUser?.login}
              </Text>
            </Box>
            <Box>
              <Heading size="md">Start Date</Heading>
              <Text color="gray.500" fontSize={"lg"}>
                {Moment(selectedUser?.startDate).format("yyyy-MM-DD")}
              </Text>
            </Box>
            <Box>
              <Heading size="md">End Date</Heading>
              <Text color="gray.500" fontSize={"lg"}>
                {Moment(selectedUser?.endDate).format("yyyy-MM-DD")}
              </Text>
            </Box>
            <Box>
              <Heading size="md">Organization</Heading>
              <Text color="gray.500" fontSize={"lg"}>
                {selectedUser?.organization?.name}
              </Text>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default UserInfo;
