import { User } from "./User.ts";

export type Organization = {
  id?: string;
  name: string;
  company: string;
  manager?: User;
};
