import { Heading } from "@chakra-ui/react";
import ReportAllAssignments from "../components/report/ReportAllAssignments.tsx";

const ReportPage = () => {
  return (
    <>
      <Heading marginBottom={5}>All User Role Assignments</Heading>
      <ReportAllAssignments></ReportAllAssignments>
    </>
  );
};

export default ReportPage;
