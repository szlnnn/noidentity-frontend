import ResourcePageHeading from "../components/resource/ResourcePageHeading.tsx";
import { VStack } from "@chakra-ui/react";
import ResourceGrid from "../components/resource/ResourceGrid.tsx";

const ManageResourcePage = () => {
  return (
    <VStack>
      <ResourcePageHeading />
      <ResourceGrid />
    </VStack>
  );
};

export default ManageResourcePage;
