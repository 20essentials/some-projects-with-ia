// app/api/chat/route.ts
import { StreamingTextResponse } from 'ai';
import type { AIService, ChatMessage } from '@/app/1/utils/types';
import { groqService } from '@/app/1/services/qroq';
import { cerebrasService } from '@/app/1/services/cerebras';

const services: AIService[] = [
  groqService,
  cerebrasService
  // otros servicios que quieras agregar
];

let currentServiceIndex = 0;
function getNextService() {
  const service = services[currentServiceIndex];
  currentServiceIndex = (currentServiceIndex + 1) % services.length;
  return service;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json() as { messages: ChatMessage[] };

    if (!messages || !messages.length) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 });
    }

    const service = getNextService();
    if (!service) {
      return new Response(JSON.stringify({ error: 'No service available' }), { status: 500 });
    }

    // tu servicio debe devolver un AsyncIterable<string>
    const aiStream = await service.chat(messages);

    // StreamingTextResponse acepta un AsyncIterable<string>
    return new StreamingTextResponse(aiStream);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}
