import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { Box, HStack, Spinner } from "@chakra-ui/react";
import useCounterStore from "../../../stores/stepStore.ts";
import useRoleStore from "../../../stores/requestRightsStore.ts";
import { useUserStore } from "../../../stores/requestUserStore.ts";

const ConfirmRequest = () => {
  const navigate = useNavigate();
  const { reset } = useCounterStore();
  const { clearStorage } = useRoleStore();
  const { removeSelectedUser } = useUserStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      reset();
      clearStorage();
      removeSelectedUser();
      navigate("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Box>Your request was sent</Box>
      <HStack>
        <IoCheckmarkDone color={"teal"} size={80} />;
        <Spinner />
      </HStack>
    </>
  );
};

export default ConfirmRequest;
