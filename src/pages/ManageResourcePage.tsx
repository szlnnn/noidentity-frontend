import ResourcePageHeading from "../components/resource/ResourcePageHeading.tsx";
import { VStack } from "@chakra-ui/react";

const ManageResourcePage = () => {
  return (
    <VStack width={"60%"}>
      <ResourcePageHeading />
      <div>Manage Resource</div>;
    </VStack>
  );
};

export default ManageResourcePage;
