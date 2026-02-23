import { streamText } from 'ai';
import { NextResponse, type NextRequest } from 'next/server';
import { CONFIG } from '@/app/2/utils/consts';
import { ChatMessage } from '../../utils/types';

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: ChatMessage[];
    };

    if (!messages?.length) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      );
    }

    const prompt = [
      `Eres un asistente que responde preguntas de manera graciosa, ingeniosa y con muchos emojis 😄✨.`,
      `Tu objetivo es entretener mientras das información útil y clara.`,
      `Evita cualquier explicación técnica innecesaria o comentarios fuera de la respuesta.`,
      `Responde siempre directamente a la pregunta del usuario.`,
      `Usa un tono divertido, cercano y ligero en español.`,
      `Incluye emojis relevantes en cada respuesta.`,
      `Si la pregunta es seria, responde con respeto pero manteniendo un toque simpático 🙂.`,
      ``,
      `Pregunta:`,
      messages.map(m => m.content).join('\n')
    ].join('\n');

    const result =  streamText({
      model: CONFIG.MODEL_AI,
      prompt
    });

    return result.toTextStreamResponse();
  } catch {
    return NextResponse.json(
      { error: 'Error generating response' },
      { status: 500 }
    );
  }
}
