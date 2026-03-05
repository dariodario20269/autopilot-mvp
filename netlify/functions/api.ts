import { Handler } from "@netlify/functions";
import { app } from "../../server/_core/index";

const handler: Handler = async (event, context) => {
  // Convert Netlify event to Express-like request
  const req = {
    method: event.httpMethod,
    path: event.path,
    headers: event.headers,
    body: event.body ? JSON.parse(event.body) : undefined,
    query: event.queryStringParameters || {},
  };

  // Create a mock response object
  let statusCode = 200;
  let responseBody = "";
  const responseHeaders: Record<string, string> = {};

  // Mock Express response methods
  const res = {
    status: (code: number) => {
      statusCode = code;
      return res;
    },
    json: (data: any) => {
      responseBody = JSON.stringify(data);
      responseHeaders["Content-Type"] = "application/json";
      return res;
    },
    send: (data: any) => {
      responseBody = typeof data === "string" ? data : JSON.stringify(data);
      return res;
    },
    set: (key: string, value: string) => {
      responseHeaders[key] = value;
      return res;
    },
    header: (key: string, value: string) => {
      responseHeaders[key] = value;
      return res;
    },
  };

  try {
    // Route to Express app
    await new Promise((resolve, reject) => {
      app(req as any, res as any);
      setTimeout(resolve, 30000); // 30 second timeout
    });
  } catch (error) {
    statusCode = 500;
    responseBody = JSON.stringify({ error: "Internal Server Error" });
  }

  return {
    statusCode,
    headers: responseHeaders,
    body: responseBody,
  };
};

export { handler };
