import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface Props {
  children: string;
}

const SuccessAlert = ({ children }: Props) => {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius={10}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Success!
      </AlertTitle>
      <AlertDescription maxWidth="sm">{children}</AlertDescription>
    </Alert>
  );
};

export default SuccessAlert;
