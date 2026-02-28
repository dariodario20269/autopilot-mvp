import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { handleSendGridWebhook, handleTwilioWebhook } from "./webhooks";

export const webhooksRouter = router({
  sendgrid: publicProcedure
    .mutation(async (opts) => {
      return await handleSendGridWebhook(opts.input || {});
    }),

  twilio: publicProcedure
    .mutation(async (opts) => {
      return await handleTwilioWebhook(opts.input || {});
    }),
});
