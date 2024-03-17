import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RoleCardContainer = ({ children }: Props) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      borderRadius={"10px"}
      overflow={"auto"}
      backgroundColor={"gray.700"}
      height={150}
    >
      {children}
    </Box>
  );
};

export default RoleCardContainer;
