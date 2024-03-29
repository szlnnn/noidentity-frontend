import { MdOutlinePending } from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import { Tooltip } from "@chakra-ui/react";

interface Props {
  operation: string;
}

const OperationIcon = ({ operation }: Props) => {
  return (
    <>
      {operation === "N" && (
        <Tooltip label={"Pending"}>
          <span>
            <MdOutlinePending size={30} />
          </span>
        </Tooltip>
      )}
      {operation === "A" && (
        <Tooltip label={"Approved"}>
          <span>
            <FcApprove size={30} />
          </span>
        </Tooltip>
      )}
      {operation === "R" && (
        <Tooltip label={"Rejected"}>
          <span>
            <FcDisapprove size={30} />
          </span>
        </Tooltip>
      )}
    </>
  );
};

export default OperationIcon;
