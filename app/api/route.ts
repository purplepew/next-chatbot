import { sendMessage } from "@/lib/facebook";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    } else {
      return new Response("Forbidden", { status: 403 });
    }
  }
  return new Response("Bad Request", { status: 400 });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.object === "page") {
    for (const entry of body.entry) {
      const webhookEvent = entry.messaging[0];
      const senderId = webhookEvent.sender.id;

      // If user sent a message, reply back
      if (webhookEvent.message && webhookEvent.message.text) {
        const userMessage = webhookEvent.message.text;
        console.log("User:", userMessage);

        await sendMessage(senderId, `You said: ${userMessage}`);
      }
    }
    return Response.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  }

  return new Response("Not Found", { status: 404 });
}
