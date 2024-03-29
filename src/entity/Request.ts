import { User } from "./User.ts";
import { Role } from "./Role.ts";
import { UserRoleAssignment } from "./UserRoleAssignment.ts";

export type Request = {
  id?: string;
  status: string;
  outcome: string;
  creationTime: string;
  targetUser: User;
  requester: User;
  role: Role;
  assignment: UserRoleAssignment;
  operation: string;
};
