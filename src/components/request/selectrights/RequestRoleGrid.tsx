import { Box, SimpleGrid } from "@chakra-ui/react";
import RoleCardContainer from "../../roles/RoleCardContainer.tsx";
import RoleCardSkeleton from "../../roles/RoleCardSkeleton.tsx";
import useRoles from "../../../hooks/useRoles.ts";
import { useParams } from "react-router-dom";
import RequestRoleCard from "./RequestRoleCard.tsx";
import BackToResourceCard from "./BackToResourceCard.tsx";
const RequestRoleGrid = () => {
  const { id } = useParams();
  const { data, isLoading } = useRoles(parseInt(id!));
  const filteredData = data?.filter((role) => role.active);
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Box padding={"10px"}>
        <SimpleGrid
          columns={{
            sm: 1,
            md: 1,
            lg: 2,
            xl: 4,
            "2xl": 6,
          }}
          spacing={6}
        >
          <RoleCardContainer key={"back"}>
            <BackToResourceCard />
          </RoleCardContainer>
          {isLoading &&
            skeletons.map((skeleton) => (
              <RoleCardContainer key={skeleton}>
                {" "}
                <RoleCardSkeleton />
              </RoleCardContainer>
            ))}
          {filteredData?.map((role) => (
            <RoleCardContainer key={role.id}>
              <RequestRoleCard role={role} />
            </RoleCardContainer>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default RequestRoleGrid;
