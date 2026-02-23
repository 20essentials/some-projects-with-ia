import type { AIService, ChatMessage } from '@/app/1/utils/types';
import { groqService } from '@/app/1/services/qroq';
import { cerebrasService } from '@/app/1/services/cerebras';

const services: AIService[] = [
  groqService
  // cerebrasService,
];

let currentServiceIndex = 0;

function getNextService() {
  const service = services[currentServiceIndex];
  currentServiceIndex = (currentServiceIndex + 1) % services.length;
  return service;
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!messages || !messages.length) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400
      });
    }

    const service = getNextService();
    if (!service) {
      return new Response(JSON.stringify({ error: 'No service available' }), {
        status: 500
      });
    }

    const aiStream = await service.chat(messages); // AsyncIterable<string>

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of aiStream) {
            controller.enqueue(new TextEncoder().encode(chunk));
          }
          controller.close();
        } catch (err) {
          console.error(err);
          controller.enqueue(
            new TextEncoder().encode('\n[Error streaming response]')
          );
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500
    });
  }
}
