import { ServerResponse } from "http";

export function onError(error: unknown, res: ServerResponse) {
  console.error(error);

  if (!res.headersSent) {
    res.statusCode = 500;
    res.end("Error: Server Error");
  }
}
