import "./node-global.js";
import { createServer } from "http";
import { handler } from "../../handler.js";
import { onError } from "./node-on-error.js";

createAdapterNode();

export function createAdapterNode() {
  const PORT = parseInt(process.env.PORT || "4000");

  const server = createServer(async (req, res) => {
    const protocol = "http";
    const url = new URL(req.url || "", `${protocol}://${req.headers.host}`);

    if (url.pathname.includes("favicon")) {
      res.end();
      return;
    }

    const headers = new Headers();

    for (const [key, val] of Object.entries(req.headers)) {
      if (typeof val === "string" || Array.isArray(val)) {
        if (Array.isArray(val)) val.forEach((val) => headers.set(key, val));
        else headers.set(key, val);
      }
    }

    const request = new Request(url, {
      method: req.method,
      headers,
    });

    try {
      const response = await handler(request);

      res.statusCode = response.status;

      response.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });

      if (response.body) {
        const reader = response.body.getReader();

        const pipe = async () => {
          try {
            const result = await reader.read();
            if (result.value) res.write(result.value);
            if (result.done) res.end();
            else pipe();
          } catch (e) {
            return onError(e, res);
          }
        };
        pipe();
      } else {
        res.end();
      }
    } catch (e) {
      return onError(e, res);
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`\n> http://localhost:${PORT}/\n`);
  });
}
