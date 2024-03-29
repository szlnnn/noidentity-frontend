import { Task } from "../Task.ts";
import { Request } from "../Request.ts";

export type RequestWithTasksDto = {
  request: Request;
  managerTask: Task;
  applicationOwnerTask: Task;
};
