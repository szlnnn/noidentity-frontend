import {
  Card,
  CardBody,
  Heading,
  HStack,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Resource } from "../../entity/Resource.ts";
import ResourceIcon from "./ResourceIcon.tsx";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import UpdateResourceModalComponent from "./UpdateResourceModalComponent.tsx";
import { PiListPlusBold } from "react-icons/pi";
import { Link } from "react-router-dom";

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
            <HStack width={"100%"} justifyContent="space-between">
              <Heading fontSize={"2xl"}>{resource.name}</Heading>
              <VStack>
                <FaRegEdit size={20} onClick={handleEditClick} />
                <Link to={"/resources/roles/" + resource.id}>
                  <Tooltip hasArrow label="Manage Roles" placement="right-end">
                    <span>
                      <PiListPlusBold size={25} />
                    </span>
                  </Tooltip>
                </Link>
              </VStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
      {isEdit && (
        <UpdateResourceModalComponent
          isOpen={isOpen}
          onClose={onClose}
          title={"Edit resource"}
          resource={resource}
        />
      )}
    </>
  );
};

export default ResourceCard;
