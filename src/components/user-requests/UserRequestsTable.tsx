import useRequestWithTasksDto from "../../hooks/useRequestWithTasksDto.ts";
import authService from "../../service/authService.ts";
import {
  Box,
  Text,
  HStack,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Moment from "moment/moment";
import OperationIcon from "./OperationIcon.tsx";
import helperService from "../../service/helperService.ts";
import { useState } from "react";

const UserRequestsTable = () => {
  const user = authService.getCurrentUser();
  const { data: requests } = useRequestWithTasksDto(user.id);
  const [filterRequests, setFilterRequests] = useState(false);

  return (
    <>
      <HStack padding={5} width={"95%"} justifyContent={"right"}>
        <Text marginRight={5} fontSize="lg">
          Show only active requests
        </Text>
        <Switch
          size="lg"
          colorScheme={"teal"}
          isChecked={filterRequests}
          onChange={() => setFilterRequests(!filterRequests)}
        ></Switch>
      </HStack>
      <Box overflowX={"scroll"} width={"100%"}>
        <Table size="md" borderWidth="1px" variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Target User</Th>
              <Th>Target User Login</Th>
              <Th>Role</Th>
              <Th>Application</Th>
              <Th>Operation</Th>
              <Th>Status</Th>
              <Th>Request Time</Th>
              <Th>Manager Task Outcome</Th>
              <Th>Manager Task Time</Th>
              <Th>App Owner Task Outcome</Th>
              <Th>App Owner Task Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {requests
              ?.filter((dto) => {
                if (filterRequests) {
                  return (
                    dto.request.status === "P" ||
                    dto.request.status === "U" ||
                    dto.request.status === "N"
                  );
                } else {
                  return true;
                }
              })
              .sort(helperService.compareByDate)
              .map((request) => (
                <Tr key={request.request.id}>
                  <Td>
                    {request.request.targetUser.firstName}{" "}
                    {request.request.targetUser.lastName}
                  </Td>
                  <Td>{request.request.targetUser.login}</Td>
                  <Td>{request.request.role.name}</Td>
                  <Td>{request.request.role.resource.name}</Td>
                  <Td>
                    {helperService.getOperation(request.request.operation)}
                  </Td>
                  <Td>
                    {helperService.getRequestStatus(request.request.status)}
                  </Td>
                  <Td>
                    {request.request.creationTime &&
                      Moment(request.request.creationTime).format(
                        "yyyy-MM-DD hh:mm:ss",
                      )}
                  </Td>
                  <Td>
                    {request.managerTask && (
                      <OperationIcon operation={request.managerTask.status} />
                    )}
                  </Td>
                  <Td>
                    {request.managerTask &&
                      request.managerTask.completionTime &&
                      Moment(request.managerTask.completionTime).format(
                        "yyyy-MM-DD hh:mm:ss",
                      )}
                  </Td>
                  <Td>
                    {request.applicationOwnerTask && (
                      <OperationIcon
                        operation={request.applicationOwnerTask.status}
                      />
                    )}
                  </Td>
                  <Td>
                    {request.applicationOwnerTask &&
                      request.applicationOwnerTask.completionTime &&
                      Moment(
                        request.applicationOwnerTask.completionTime,
                      ).format("yyyy-MM-DD hh:mm:ss")}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default UserRequestsTable;
