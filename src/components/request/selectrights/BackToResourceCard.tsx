import { Card, CardBody, CardHeader, HStack, Text } from "@chakra-ui/react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackToResourceCard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/request/resource");
  };
  return (
    <>
      <Card size={"md"} cursor={"pointer"} onClick={handleClick}>
        <CardHeader>
          <HStack width={"100%"} justifyContent="space-around">
            <IoReturnUpBackOutline size={85} />
          </HStack>
        </CardHeader>
        <CardBody>
          <HStack>
            <Text overflow={"hidden"} fontSize="lg">
              Back to resource list
            </Text>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default BackToResourceCard;
