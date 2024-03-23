import { User } from "./User.ts";
import { Role } from "./Role.ts";

export type Task = {
  id?: string;
  status: string;
  type: string;
  creationTime: string;
  targetUser: User;
  role: Role;
  operation: string;
};
