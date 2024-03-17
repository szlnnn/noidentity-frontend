import { useState } from "react";
import { Role } from "../../entity/Role.ts";
import { Tooltip, useDisclosure, VStack } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import UpdateRoleModalComponent from "./UpdateRoleModalComponent.tsx";

interface Props {
  role: Role;
}

const RolesIcons = ({ role }: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = () => {
    setIsEdit(true);
    onOpen();
  };

  return (
    <>
      <VStack>
        <FaRegEdit size={20} onClick={handleEditClick} />
        {role.active ? (
          <Tooltip label="Active role">
            <span>
              <BsCheckLg size={23} />
            </span>
          </Tooltip>
        ) : (
          <Tooltip label="Inactive role">
            <span>
              <AiOutlineCloseSquare size={23} />
            </span>
          </Tooltip>
        )}
      </VStack>

      {isEdit && (
        <UpdateRoleModalComponent
          isOpen={isOpen}
          onClose={onClose}
          title={"Edit role"}
          role={role}
        />
      )}
    </>
  );
};

export default RolesIcons;
