import { getOrCreateEmailConversation, addMessageToConversation } from "./email-replies";
import { getOrCreateWhatsappConversation, addMessageToWhatsappConversation } from "./whatsapp-replies";
import { invokeGemini } from "./gemini-llm";
import { getArticlesByCategory } from "./knowledge-base";
import { saveAutoReply } from "./email-replies";
import { saveWhatsappAutoReply } from "./whatsapp-replies";

/**
 * Handle incoming email from SendGrid webhook
 */
export async function handleSendGridWebhook(payload: any) {
  try {
    const { from, subject, text, to } = payload;

    if (!from || !subject || !text) {
      console.error("[Webhooks] Invalid SendGrid payload");
      return { success: false, error: "Invalid payload" };
    }

    // Extract user ID from 'to' email (format: user-{userId}@autopilot.local)
    const userIdMatch = to.match(/user-(\d+)@/);
    if (!userIdMatch) {
      console.error("[Webhooks] Could not extract user ID from email");
      return { success: false, error: "Invalid recipient" };
    }

    const userId = parseInt(userIdMatch[1]);

    // Get or create conversation
    const conversation = await getOrCreateEmailConversation(userId, from, subject);
    if (!conversation) {
      return { success: false, error: "Failed to create conversation" };
    }

    // Add message to conversation
    const updated = await addMessageToConversation(conversation.id, userId, {
      role: "user",
      content: text,
      timestamp: new Date(),
    });

    if (!updated) {
      return { success: false, error: "Failed to add message" };
    }

    // Generate AI reply
    try {
      const knowledgeArticles = await getArticlesByCategory(userId, "FAQ");
      const knowledgeContext = knowledgeArticles
        .map(a => `${a.title}: ${a.content}`)
        .join("\n\n");

      const messageHistory = updated.messageHistory ? JSON.parse(updated.messageHistory as any) : [];
      const conversationText = messageHistory
        .map((m: any) => `${m.role === "user" ? "Customer" : "Assistant"}: ${m.content}`)
        .join("\n");

      const systemPrompt = `You are a helpful customer service assistant. Use the following knowledge base to answer customer questions accurately and professionally.

Knowledge Base:
${knowledgeContext || "No knowledge base articles available."}`;

      const userMessage = `Please generate a professional email reply to this customer conversation:\n\n${conversationText}`;

      const response = await invokeGemini({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      });

      const messageContent = response.choices[0]?.message?.content;
      const replyContent = typeof messageContent === "string" ? messageContent : "";

      // Save auto-reply
      await saveAutoReply(conversation.id, userId, replyContent);

      console.log(`[Webhooks] Auto-reply generated for email conversation ${conversation.id}`);
      return { success: true, conversationId: conversation.id, reply: replyContent };
    } catch (error) {
      console.error("[Webhooks] Failed to generate auto-reply:", error);
      return { success: true, conversationId: conversation.id, reply: null };
    }
  } catch (error) {
    console.error("[Webhooks] SendGrid webhook error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Handle incoming WhatsApp message from Twilio webhook
 */
export async function handleTwilioWebhook(payload: any) {
  try {
    const { From, Body, To } = payload;

    if (!From || !Body) {
      console.error("[Webhooks] Invalid Twilio payload");
      return { success: false, error: "Invalid payload" };
    }

    // Extract user ID from 'To' (format: whatsapp:+1234567890-user-{userId})
    const userIdMatch = To.match(/user-(\d+)/);
    if (!userIdMatch) {
      console.error("[Webhooks] Could not extract user ID from WhatsApp");
      return { success: false, error: "Invalid recipient" };
    }

    const userId = parseInt(userIdMatch[1]);
    const customerPhone = From.replace("whatsapp:", "");

    // Get or create conversation
    const conversation = await getOrCreateWhatsappConversation(userId, customerPhone);
    if (!conversation) {
      return { success: false, error: "Failed to create conversation" };
    }

    // Add message to conversation
    const updated = await addMessageToWhatsappConversation(conversation.id, userId, {
      role: "user",
      content: Body,
      timestamp: new Date(),
    });

    if (!updated) {
      return { success: false, error: "Failed to add message" };
    }

    // Generate AI reply
    try {
      const knowledgeArticles = await getArticlesByCategory(userId, "FAQ");
      const knowledgeContext = knowledgeArticles
        .map(a => `${a.title}: ${a.content}`)
        .join("\n\n");

      const messageHistory = updated.messageHistory ? JSON.parse(updated.messageHistory as any) : [];
      const conversationText = messageHistory
        .map((m: any) => `${m.role === "user" ? "Customer" : "Assistant"}: ${m.content}`)
        .join("\n");

      const systemPrompt = `You are a helpful WhatsApp customer service assistant. Keep responses brief and friendly (under 160 characters when possible).

Knowledge Base:
${knowledgeContext || "No knowledge base articles available."}`;

      const userMessage = `Please generate a brief WhatsApp reply to this customer conversation:\n\n${conversationText}`;

      const response = await invokeGemini({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      });

      const messageContent = response.choices[0]?.message?.content;
      const replyContent = typeof messageContent === "string" ? messageContent : "";

      // Save auto-reply
      await saveWhatsappAutoReply(conversation.id, userId, replyContent);

      console.log(`[Webhooks] Auto-reply generated for WhatsApp conversation ${conversation.id}`);
      return { success: true, conversationId: conversation.id, reply: replyContent };
    } catch (error) {
      console.error("[Webhooks] Failed to generate auto-reply:", error);
      return { success: true, conversationId: conversation.id, reply: null };
    }
  } catch (error) {
    console.error("[Webhooks] Twilio webhook error:", error);
    return { success: false, error: String(error) };
  }
}
