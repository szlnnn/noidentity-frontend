import { Box, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MenuItemContainer = ({ children }: Props) => {
  const style = {
    background: `linear-gradient(270deg, rgba(49,55,53,1) 0%, rgba(36,48,45,1) 75%, rgba(29,43,43,1) 95%)`,
  };
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      p={4}
      borderWidth="2px"
      borderRadius="10px"
      textAlign="center"
      style={style}
      position={"relative"}
    >
      <HStack justifyContent={"space-between"}>{children}</HStack>
    </Box>
  );
};

export default MenuItemContainer;
