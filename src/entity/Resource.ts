import { User } from "./User.ts";

export type Resource = {
  id?: string;
  name: string;
  type: string;
  azureConfig?: {
    tenantId: string;
    applicationId: string;
    scope: string;
    secret: string;
  };
  appOwner?: User;
};
