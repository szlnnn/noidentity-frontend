import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface Props {
  children: string;
}

const ErrorAlert = ({ children }: Props) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius={10}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Oops! An error occurred.
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {children || "Something went wrong. Please try again later."}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
