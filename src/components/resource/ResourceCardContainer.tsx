import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      borderRadius={"10px"}
      overflow={"hidden"}
      width={"250px"}
      height={"200px"}
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
