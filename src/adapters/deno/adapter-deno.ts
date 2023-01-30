import { handler } from "../../handler.ts";

createAdapterDeno();

export async function createAdapterDeno() {
  const server = Deno.listen({ port: 8080 });

  console.log(`\n> http://localhost:8080/\n`);

  for await (const conn of server) {
    serveHttp(conn);
  }

  async function serveHttp(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);

    for await (const requestEvent of httpConn) {
      const response = await handler(requestEvent.request);
      requestEvent.respondWith(response);
    }
  }
}
