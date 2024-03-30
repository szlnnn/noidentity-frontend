import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
} from "@chakra-ui/react";
import Moment from "moment/moment";
import useAllUserRoleAssignments from "../../hooks/useAllUserRoleAssignments.ts";
import helperService from "../../service/helperService.ts";
import useUsers from "../../hooks/useUsers.ts";
import { UserRoleAssignmentExportDto } from "../../entity/dto/UserRoleAssignmentExportDto.ts";
import { PiFileXlsLight } from "react-icons/pi";
import ExportXLSService from "../../service/exportXLSService.ts";

const ReportAllAssignments = () => {
  const { data: userRoleAssignments } = useAllUserRoleAssignments();

  const { data: users } = useUsers();

  const getUser = (userId: number) => {
    return users?.find((user) => parseInt(user.id!) === userId);
  };

  const myTableData: UserRoleAssignmentExportDto[] = [];

  const exportData = () => {
    userRoleAssignments?.forEach((ura) => {
      const uraDto = new UserRoleAssignmentExportDto();
      uraDto.user_full_name =
        getUser(ura.userId)?.firstName + " " + getUser(ura.userId)?.lastName;
      uraDto.user_login = getUser(ura.userId)?.login || "";
      uraDto.user_email = getUser(ura.userId)?.email || "";
      uraDto.role = ura.role.name;
      uraDto.resource = ura.role.resource.name;
      uraDto.assignedTime =
        ura.assignedTime &&
        Moment(ura?.assignedTime).format("yyyy-MM-DD hh:mm:ss");
      uraDto.requestTime =
        ura.createdTime &&
        Moment(ura?.createdTime).format("yyyy-MM-DD hh:mm:ss");
      uraDto.revokedTime =
        ura.revokedTime &&
        Moment(ura?.revokedTime).format("yyyy-MM-DD hh:mm:ss");
      uraDto.status =
        helperService.getOperationLabel(ura.assignmentStatus) || "";
      myTableData.push(uraDto);
    });

    ExportXLSService.exportToExcel(
      myTableData,
      "report" + Moment(new Date()).format("yyyy-MM-DD hh:mm:ss"),
    );
  };

  return (
    <>
      <HStack width={"100%"} justifyContent={"right"} marginBottom={5}>
        <Button
          width={"9%"}
          colorScheme={"ghost"}
          onClick={exportData}
          justifyContent={"space-between"}
        >
          <Text color={"gray.300"}>Download</Text>
          <PiFileXlsLight color={"teal"} size={50} />
        </Button>
      </HStack>

      <Table variant="striped" size="md" borderWidth="1px" colorScheme={"teal"}>
        <Thead>
          <Tr>
            <Th>User Full Name</Th>
            <Th>User Login</Th>
            <Th>User Email</Th>
            <Th>Role</Th>
            <Th>Resource</Th>
            <Th>Assigned Time</Th>
            <Th>Request Time</Th>
            <Th>Revoked Time</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userRoleAssignments?.map((assignment) => (
            <Tr key={assignment.id}>
              <Td>
                {getUser(assignment.userId)?.firstName}{" "}
                {getUser(assignment.userId)?.lastName}
              </Td>
              <Td>{getUser(assignment.userId)?.login}</Td>
              <Td>{getUser(assignment.userId)?.email}</Td>
              <Td>{assignment.role.name}</Td>
              <Td>{assignment.role.resource.name}</Td>
              <Td>
                {assignment.assignedTime &&
                  Moment(assignment?.assignedTime).format(
                    "yyyy-MM-DD hh:mm:ss",
                  )}
              </Td>
              <Td>
                {assignment.createdTime &&
                  Moment(assignment?.createdTime).format("yyyy-MM-DD hh:mm:ss")}
              </Td>
              <Td>
                {assignment.revokedTime &&
                  Moment(assignment?.revokedTime).format("yyyy-MM-DD hh:mm:ss")}
              </Td>
              <Td>
                {helperService.getOperationLabel(assignment.assignmentStatus)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ReportAllAssignments;
