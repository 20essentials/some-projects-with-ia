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
