import { Box, Divider, Heading, HStack } from "@chakra-ui/react";
import UserInfo from "../searchuser/UserInfo.tsx";
import SelectedRights from "../selectrights/SelectedRights.tsx";

const ConfirmRequest = () => {
  return (
    <>
      <Box width={"65%"}>
        <Heading>Confirm Request Data</Heading>
        <HStack justifyContent={"space-between"} height={"500px"}>
          <UserInfo />
          <Divider orientation={"vertical"} />
          <SelectedRights isConfirmation={true} />
        </HStack>
      </Box>
    </>
  );
};

export default ConfirmRequest;
