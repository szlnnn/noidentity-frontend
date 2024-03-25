import { Role } from "./Role.ts";

export type UserRoleAssignment = {
  id: string;
  userId: number;
  role: Role;
  assignmentStatus: string;
  createdTime: string;
  assignedTime: string;
  revokedTime: string;
};
