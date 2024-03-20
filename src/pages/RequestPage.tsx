import RequestPageHeading from "../components/request/RequestPageHeading.tsx";
import { VStack } from "@chakra-ui/react";
import RequestContent from "../components/request/RequestContent.tsx";

const RequestPage = () => {
  return (
    <VStack>
      <RequestPageHeading />
      <RequestContent />
    </VStack>
  );
};

export default RequestPage;
