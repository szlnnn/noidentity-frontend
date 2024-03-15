import { Box, SimpleGrid } from "@chakra-ui/react";
import ResourceCardContainer from "./ResourceCardContainer.tsx";
import ResourceCardSkeleton from "./ResourceCardSkeleton.tsx";
import ResourceCard from "./ResourceCard.tsx";
import useResources from "../../hooks/useResources.ts";

const ResourceGrid = () => {
  const { data, isLoading } = useResources();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <Box padding={"10px"}>
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
            <ResourceCard resource={resource} />
          </ResourceCardContainer>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ResourceGrid;
