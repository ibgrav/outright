type Handler = (request: Request) => Promise<Response>;

export const handler: Handler = async (req) => {
  const res = await fetch("https://google.com");

  return new Response(res.body, {
    status: 200,
    headers: {
      "content-type": "text/plain",
    },
  });
};
