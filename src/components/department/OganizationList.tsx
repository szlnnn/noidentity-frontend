import { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import useOrganizations from "../../hooks/useOrganizations.ts";
import { Organization } from "../../entity/Organization.ts";
import EditDepartmentModalComponent from "./EditDepartmentModalComponent.tsx";

const OrganizationList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const { data: organizations } = useOrganizations();
  const handleEditClick = (org: Organization) => {
    setCurrentOrg(org);
    onOpen();
  };

  const afterClose = () => {
    setCurrentOrg(null);
    onClose();
  };

  return (
    <Box>
      <Table variant="simple" size="md" borderWidth="1px">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Company</Th>
            <Th>Manager</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {organizations?.map((org) => (
            <Tr key={org.id}>
              <Td>{org.name}</Td>
              <Td>{org.company}</Td>
              <Td>
                {org.manager?.lastName} {org.manager?.firstName}{" "}
              </Td>
              <Td>
                <Button
                  width={"15px"}
                  height={"25px"}
                  colorScheme="teal"
                  onClick={() => handleEditClick(org)}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {currentOrg && (
        <EditDepartmentModalComponent
          isOpen={isOpen}
          onClose={afterClose}
          title={"Edit organization data"}
          org={currentOrg}
        />
      )}
    </Box>
  );
};

export default OrganizationList;
