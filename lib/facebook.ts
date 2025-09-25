

export async function sendMessage(recipientId: string, text: string | Promise<string | undefined>) {
  const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

  const url = `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

  const payload = {
    recipient: { id: recipientId },
    message: { text },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // Read the body at most once
  const responseText = await res.text();

  if (!res.ok) {
    console.error("Failed to send message:", responseText);
    try {
      return JSON.parse(responseText);
    } catch {
      return { error: true, status: res.status } as unknown as any;
    }
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return { ok: true } as unknown as any;
  }
}