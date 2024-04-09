import { RequestWithTasksDto } from "../entity/dto/RequestWithTasksDto.ts";

const getOperationLabel = (assignmentStatus: string) => {
  if (assignmentStatus === "A") {
    return "Assigned";
  }
  if (assignmentStatus === "PR" || assignmentStatus === "PTR") {
    return "Pending request to revoke";
  }
  if (assignmentStatus === "PA" || assignmentStatus === "PTA") {
    return "Pending request";
  }
  if (assignmentStatus === "R") {
    return "Revoked";
  }
};

const getOperation = (operation: string) => {
  if (operation === "A") {
    return "Requesting";
  }
  if (operation === "R") {
    return "Revoking";
  }
};

const getRequestStatus = (requestStatus: string) => {
  if (requestStatus === "P") {
    return "Pending provision";
  }
  if (requestStatus === "T") {
    return "Rejected";
  }
  if (requestStatus === "C") {
    return "Successfully Completed ";
  }
  if (requestStatus === "U") {
    return "Pending Approval";
  }
  if (requestStatus === "N") {
    return "Not processed";
  }
};

const compareByDate = (a: RequestWithTasksDto, b: RequestWithTasksDto) => {
  return (
    new Date(b.request.creationTime).getTime() -
    new Date(a.request.creationTime).getTime()
  );
};

const HelperService = {
  getOperationLabel,
  getOperation,
  getRequestStatus,
  compareByDate,
};

export default HelperService;
