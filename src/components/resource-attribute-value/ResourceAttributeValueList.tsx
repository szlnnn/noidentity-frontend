import {
  Box,
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useResourceAttributeValues from "../../hooks/useResourceAttributeValues.ts";
import { ResourceAttributeValue } from "../../entity/ResourceAttributeValue.ts";
import { useUpdateResourceAttributeValue } from "../../hooks/useUpdateResourceAttributeValue.ts";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

const ResourceAttributeValueList = () => {
  const { data: values, isLoading } = useResourceAttributeValues();
  const updateMutation = useUpdateResourceAttributeValue();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = values?.slice(indexOfFirstItem, indexOfLastItem);
  let totalPages = 1;
  if (values) {
    totalPages = Math.ceil(values.length / itemsPerPage);
  }

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  const getBGColor = (value: ResourceAttributeValue) => {
    if (value.managed) {
      return "#006969";
    }
  };

  const handleClick = (value: ResourceAttributeValue) => {
    updateMutation.mutate({ ...value, managed: !value.managed });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Box width={"95%"}>
        <Table
          variant="simple"
          size="md"
          borderWidth="1px"
          overflowY="scroll"
          overflowX={"hidden"}
        >
          <Thead>
            <Tr>
              <Th>Resource</Th>
              <Th>Name</Th>
              <Th>Identifier</Th>
              <Th>Managed</Th>
              <Th>Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((value) => (
              <Tr
                key={value.id}
                onClick={() => handleClick(value)}
                cursor={"pointer"}
                bgColor={getBGColor(value)}
              >
                <Td>{value.resource.name}</Td>
                <Td>{value.name}</Td>
                <Td>{value.identifier}</Td>
                <Td>{value.managed && <FaCheck size={25} />}</Td>
                <Td>{value.type} Task</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box
        width={"95%"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={4}
      >
        <Button onClick={prevPage} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={nextPage} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default ResourceAttributeValueList;
