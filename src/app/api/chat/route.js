import { aiPrompt } from "@/lib/aiPrompt";

export async function POST(req) {
  const { prompt } = await req.json();

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.APIKEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
            {
                role:'system',
                content:aiPrompt
            },
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: true,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    return Response.json({ error }, { status: response.status });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body.getReader();

      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();

            if (!trimmed.startsWith("data:")) continue;

            const data = trimmed.replace("data:", "").trim();

            if (data === "[DONE]") {
              controller.close();
              return;
            }

            try {
              const parsed = JSON.parse(data);

              const content =
                parsed.choices?.[0]?.delta?.content;

              if (content) {
                controller.enqueue(
                  encoder.encode(content)
                );
              }
            } catch (err) {}
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        reader.releaseLock();
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}