import { Outlet } from "react-router-dom";
import { Divider, HStack } from "@chakra-ui/react";
import SelectedRights from "../components/request/selectrights/SelectedRights.tsx";

const RequestSelectRolePage = () => {
  return (
    <HStack height={"800px"} justifyContent={"space-evenly"}>
      <Outlet />
      <Divider orientation={"vertical"} padding={10} />
      <SelectedRights isConfirmation={false} />
    </HStack>
  );
};

export default RequestSelectRolePage;
