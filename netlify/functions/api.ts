import { Handler } from "@netlify/functions";
import serverless from "serverless-http";
import { app } from "../../server/_core/index";

// The app is already configured for serverless in server/_core/index.ts
// when process.env.NETLIFY is true.

const serverlessHandler = serverless(app);

export const handler: Handler = async (event, context) => {
  // Ensure we're in a "production-like" state for the Express app
  process.env.NODE_ENV = "production";
  
  // serverless-http handles the conversion between Netlify events and Express
  return await serverlessHandler(event, context);
};
