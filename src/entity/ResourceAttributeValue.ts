import { Resource } from "./Resource.ts";

export type ResourceAttributeValue = {
  id: string;
  name: string;
  identifier: string;
  managed: boolean;
  type: string;
  resource: Resource;
};
