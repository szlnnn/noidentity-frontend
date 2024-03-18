import { Organization } from "./Organization.ts";

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  login: string;
  startDate: string;
  endDate: string;
  email: string;
  role: string;
  organization?: Organization;
};
