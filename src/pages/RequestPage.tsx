import RequestPageHeading from "../components/request/RequestPageHeading.tsx";
import { VStack } from "@chakra-ui/react";
import RequestContent from "../components/request/RequestContent.tsx";
import { Outlet } from "react-router-dom";

const RequestPage = () => {
  return (
    <VStack>
      <RequestPageHeading />
      <Outlet />
      <RequestContent />
    </VStack>
  );
};

export default RequestPage;
