import { Resource } from "./Resource.ts";

export type Role = {
  id?: string;
  name: string;
  description: string;
  type: string;
  resource: Resource;
  created: string;
  active: boolean;
  resourceRoleId: string;
};
