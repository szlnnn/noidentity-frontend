import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const ResourceCardSkeleton = () => {
  return (
    <Card>
      <Skeleton width={"110px"} />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default ResourceCardSkeleton;
