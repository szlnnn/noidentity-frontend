import {
  Card,
  CardBody,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Resource } from "../../entity/Resource.ts";
import ResourceIcon from "./ResourceIcon.tsx";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import UpdateResourceModalComponent from "./UpdateResourceModalComponent.tsx";

interface Props {
  resource: Resource;
}

const ResourceCard = ({ resource }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = () => {
    setIsEdit(true);
    onOpen();
  };

  return (
    <>
      <Card>
        <CardBody>
          <VStack>
            <ResourceIcon resource={resource} />
            <HStack>
              <Heading fontSize={"2xl"}>{resource.name}</Heading>
              <FaRegEdit onClick={handleEditClick} />
            </HStack>
          </VStack>
        </CardBody>
      </Card>
      {isEdit && (
        <UpdateResourceModalComponent
          isOpen={isOpen}
          onClose={onClose}
          title={"Add new Resource"}
          resource={resource}
        />
      )}
    </>
  );
};

export default ResourceCard;
