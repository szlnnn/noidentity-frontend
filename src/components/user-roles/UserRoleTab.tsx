import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useUserRoleAssignments from "../../hooks/useUserRoleAssignments.ts";
import authService from "../../service/authService.ts";
import UserRoleTable from "./UserRoleTable.tsx";

const UserRoleTab = () => {
  const logonUser = authService.getCurrentUser();
  const { data: userRoleAssignments } = useUserRoleAssignments(
    parseInt(logonUser.id),
  );

  const assignedRoles = userRoleAssignments?.filter(
    (ura) => ura.assignmentStatus === "A" || ura.assignmentStatus === "PR",
  );
  const pendingRoles = userRoleAssignments?.filter(
    (ura) => ura.assignmentStatus === "PA",
  );
  const revokedRoles = userRoleAssignments?.filter(
    (ura) => ura.assignmentStatus === "R",
  );

  return (
    <Tabs isFitted variant="enclosed" colorScheme="teal">
      <TabList mb="1em">
        <Tab>Assigned Roles</Tab>
        <Tab>Pending Roles</Tab>
        <Tab>Revoked Roles</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <UserRoleTable assignments={assignedRoles} />
        </TabPanel>
        <TabPanel>
          <UserRoleTable assignments={pendingRoles} />
        </TabPanel>
        <TabPanel>
          <UserRoleTable assignments={revokedRoles} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserRoleTab;
