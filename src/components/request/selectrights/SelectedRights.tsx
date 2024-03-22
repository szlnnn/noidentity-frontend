import useRoleStore from "../../../stores/requestRightsStore.ts";
import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { Role } from "../../../entity/Role.ts";

interface Props {
  isConfirmation: boolean;
}

const SelectedRights = ({ isConfirmation }: Props) => {
  const { roles, removeRole } = useRoleStore();

  const handleButtonClick = () => {
    roles.forEach((role) => removeRole(role.id!));
  };

  const handleClick = (role: Role) => {
    if (!isConfirmation) {
      removeRole(role.id!);
    }
  };

  return (
    <>
      {roles.length > 0 && (
        <VStack>
          <Box justifyContent={"flex-start"} marginBottom={20} marginRight={20}>
            <Heading>Selected Rights</Heading>
          </Box>

          <VStack>
            <Box maxH="500px" overflowY="scroll" overflowX={"hidden"} w="500px">
              <VStack>
                <List spacing={6}>
                  {roles?.map((role, index) => (
                    <ListItem
                      key={index}
                      cursor={"pointer"}
                      onClick={() => handleClick(role)}
                      width="full"
                      fontSize={20}
                      marginTop={"5px"}
                    >
                      <Divider orientation="horizontal" padding={"5px"} />
                      <ListIcon as={MdCheckCircle} color={"#006969"} />
                      {role.resource.name} | {role.name}
                    </ListItem>
                  ))}
                  <Divider orientation="horizontal" />
                </List>
              </VStack>
            </Box>

            {!isConfirmation && (
              <Button
                backgroundColor={"#8B4950"}
                onClick={handleButtonClick}
                marginTop={"20px"}
              >
                Clear all selection
              </Button>
            )}
          </VStack>
        </VStack>
      )}
    </>
  );
};

export default SelectedRights;
