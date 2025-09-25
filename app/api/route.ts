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

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.object === "page") {
    body.entry.forEach((entry: any) => {
      const webhookEvent = entry.messaging[0];
      console.log("Webhook event:", webhookEvent);
    });
    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  }

  return new Response("Not Found", { status: 404 });
}
