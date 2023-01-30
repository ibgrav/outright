import { fetch, Request, Response, Headers } from "undici";

//@ts-ignore
if (!globalThis.fetch) globalThis.fetch = fetch;
//@ts-ignore
if (!globalThis.Request) globalThis.Request = Request;
//@ts-ignore
if (!globalThis.Response) globalThis.Response = Response;
//@ts-ignore
if (!globalThis.Headers) globalThis.Headers = Headers;
