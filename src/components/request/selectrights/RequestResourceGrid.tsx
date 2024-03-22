import { Box, SimpleGrid } from "@chakra-ui/react";
import ResourceCardContainer from "../../resource/ResourceCardContainer.tsx";
import ResourceCardSkeleton from "../../resource/ResourceCardSkeleton.tsx";
import RequestResourceCard from "./RequestResourceCard.tsx";
import useResources from "../../../hooks/useResources.ts";

const RequestResourceGrid = () => {
  const { data, isLoading } = useResources();
  const skeletons = [1, 2, 3, 4, 5, 6];
  return (
    <Box padding={"10px"}>
      <SimpleGrid
        columns={{
          sm: 1,
          md: 1,
          lg: 2,
          xl: 4,
          "2xl": 4,
        }}
        spacing={6}
      >
        {" "}
        {isLoading &&
          skeletons.map((skeleton) => (
            <ResourceCardContainer key={skeleton}>
              {" "}
              <ResourceCardSkeleton />
            </ResourceCardContainer>
          ))}
        {data?.map((resource) => (
          <ResourceCardContainer key={resource.id}>
            <RequestResourceCard resource={resource} />
          </ResourceCardContainer>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RequestResourceGrid;
