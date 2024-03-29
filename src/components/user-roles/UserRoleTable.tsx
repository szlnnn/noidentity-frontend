import { UserRoleAssignment } from "../../entity/UserRoleAssignment.ts";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Moment from "moment";
import helperService from "../../service/helperService.ts";

interface Props {
  assignments: UserRoleAssignment[] | undefined;
}

const UserRoleTable = ({ assignments }: Props) => {
  return (
    <>
      <Table variant="simple" size="md" borderWidth="1px">
        <Thead>
          <Tr>
            <Th>Role</Th>
            <Th>Resource</Th>
            <Th>Assigned Time</Th>
            <Th>Request Time</Th>
            <Th>Revoked Time</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assignments?.map((assignemnt) => (
            <Tr key={assignemnt.id}>
              <Td>{assignemnt.role.name}</Td>
              <Td>{assignemnt.role.resource.name}</Td>
              <Td>
                {assignemnt.assignedTime &&
                  Moment(assignemnt?.assignedTime).format(
                    "yyyy-MM-DD hh:mm:ss",
                  )}
              </Td>
              <Td>
                {assignemnt.createdTime &&
                  Moment(assignemnt?.createdTime).format("yyyy-MM-DD hh:mm:ss")}
              </Td>
              <Td>
                {assignemnt.revokedTime &&
                  Moment(assignemnt?.revokedTime).format("yyyy-MM-DD hh:mm:ss")}
              </Td>
              <Td>
                {helperService.getOperationLabel(assignemnt.assignmentStatus)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default UserRoleTable;
