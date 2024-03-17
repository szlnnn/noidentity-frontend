import { Box, Center, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { Resource } from "../../entity/Resource.ts";
import RoleCardContainer from "./RoleCardContainer.tsx";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import CreateRoleModalComponent from "./CreateRoleModalComponent.tsx";
import useRoles from "../../hooks/useRoles.ts";
import RoleCard from "./RoleCard.tsx";
import RoleCardSkeleton from "./RoleCardSkeleton.tsx";

interface Props {
  resource: Resource;
}

const RoleManagementGrid = ({ resource }: Props) => {
  const [isRoleCreated, setIsRoleCreated] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useRoles(parseInt(resource.id!));
  const skeletons = [1, 2, 3, 4, 5, 6];
  const handleAddRoleClick = () => {
    setIsRoleCreated(true);
    onOpen();
  };

  return (
    <>
      <Box padding={"10px"} marginTop={10}>
        <SimpleGrid
          columns={{
            sm: 1,
            md: 2,
            lg: 2,
            xl: 4,
            "2xl": 5,
          }}
          spacing={6}
        >
          <RoleCardContainer>
            <Center>
              <Box marginTop={3}>
                <IoAddCircleOutline size={115} onClick={handleAddRoleClick} />
              </Box>
            </Center>
          </RoleCardContainer>
          {isLoading &&
            skeletons.map((skeleton) => (
              <RoleCardContainer key={skeleton}>
                {" "}
                <RoleCardSkeleton />
              </RoleCardContainer>
            ))}
          {data?.map((role) => (
            <RoleCardContainer key={role.id}>
              <RoleCard role={role} />
            </RoleCardContainer>
          ))}
        </SimpleGrid>
      </Box>
      {isRoleCreated && (
        <CreateRoleModalComponent
          isOpen={isOpen}
          onClose={onClose}
          title={"Add new role"}
          resource={resource}
        />
      )}
    </>
  );
};

export default RoleManagementGrid;
