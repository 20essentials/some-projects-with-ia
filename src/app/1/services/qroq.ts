/* pnpm add groq-sdk */
import { Groq } from 'groq-sdk';
import type { AIService, ChatMessage } from '@/app/1/utils/types';
import { MODEL_NAME } from '../utils/consts';

const groq = new Groq();

export const groqService: AIService = {
  name: 'Groq',
  async chat(messages: ChatMessage[]) {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: MODEL_NAME,
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 1,
      stream: true,
      stop: null
    });

    return (async function* () {
      for await (const chunk of chatCompletion) {
        yield chunk.choices[0]?.delta?.content || '';
      }
    })();
  }
};
