import OrganizationPageHeading from "../components/department/OrganizationPageHeading.tsx";
import { VStack } from "@chakra-ui/react";
import OrganizationList from "../components/department/OganizationList.tsx";

const ManageDepartmentsPage = () => {
  return (
    <VStack>
      <OrganizationPageHeading />
      <OrganizationList />
    </VStack>
  );
};

export default ManageDepartmentsPage;
