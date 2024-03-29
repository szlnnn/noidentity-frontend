import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Stack,
  Avatar,
  Box,
  Text,
  Heading,
  ModalFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import { User } from "../../entity/User.ts";
import Moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/requestUserStore.ts";
import useRoleStore from "../../stores/requestRightsStore.ts";
import useRevokeRoleStore from "../../stores/revokeRightsStore.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const UserSearchResultModal = ({ isOpen, onClose, user }: Props) => {
  const navigate = useNavigate();
  const { selectUser } = useUserStore();
  const { clearStorage } = useRoleStore();
  const { clearRevokedRolesStorage } = useRevokeRoleStore();
  const handleRequest = () => {
    onClose();
    navigate("/request");
    clearStorage();
    clearRevokedRolesStorage();
    selectUser(user);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
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
          </Stack>
        </ModalBody>
        <ModalFooter>
          <HStack marginTop={3}>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={handleRequest}
            >
              Request for user
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserSearchResultModal;
