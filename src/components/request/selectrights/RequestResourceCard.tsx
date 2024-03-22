import { Card, CardBody, Heading, VStack } from "@chakra-ui/react";
import ResourceIcon from "../../resource/ResourceIcon.tsx";
import { Resource } from "../../../entity/Resource.ts";
import { Link } from "react-router-dom";
interface Props {
  resource: Resource;
}
const RequestResourceCard = ({ resource }: Props) => {
  return (
    <>
      <Card>
        <Link to={"/request/resource/" + resource.id + "/roles"}>
          <CardBody>
            <VStack>
              <ResourceIcon resource={resource} />
              <Heading fontSize={"2xl"}>{resource.name}</Heading>
            </VStack>
          </CardBody>
        </Link>
      </Card>
    </>
  );
};

export default RequestResourceCard;
