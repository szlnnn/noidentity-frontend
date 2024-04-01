import { Heading } from "@chakra-ui/react";
import ResourceAttributeValueList from "../components/resource-attribute-value/ResourceAttributeValueList.tsx";

const ManageResourceAttributeValuesPage = () => {
  return (
    <>
      <Heading marginBottom={5}>Manage Online Resource Role Values</Heading>
      <ResourceAttributeValueList></ResourceAttributeValueList>
    </>
  );
};

export default ManageResourceAttributeValuesPage;
