'use server';

import { formEntityType, inputID } from '../utils/consts';
import { groqService } from '@/app/1/services/qroq';
import { cerebrasService } from '@/app/1/services/cerebras';
import type { AIService, ChatMessage } from '@/app/1/utils/types';

const services: AIService[] = [
  groqService,
  cerebrasService
  // Google Gemini
  // OpenRouter
  // otro servicio incluso local
];
let currentServiceIndex = 0;

function getNextService() {
  const service = services[currentServiceIndex];
  currentServiceIndex = (currentServiceIndex + 1) % services.length;
  return service;
}

export async function actionSubmit(
  prevState: formEntityType,
  formData: FormData
) {
  const newData: formEntityType = {
    question: formData.get(inputID.question) as string,
    response: formData.get(inputID.response) as string
  };

  if (!newData.question || !newData.response) return { ...newData };
  const messages: ChatMessage[] = [{ role: 'user', content: newData.question }];
  

  // const service = getNextService();

  // console.log(`Using ${service?.name} service`);
  // const stream = await service?.chat(messages);

  // return new Response(stream, {
  //   headers: {
  //     'Content-Type': 'text/event-stream',
  //     'Cache-Control': 'no-cache',
  //     Connection: 'keep-alive'
  //   }
  // });
  // return new Response('Not found', { status: 404 });

  return { ...newData };
}
