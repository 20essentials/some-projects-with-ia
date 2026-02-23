export type formEntityType = {
  question: string;
  response: string;
};

export const inputID = {
  question: '55bdbee4-36ce-46ae-9313-edf6e4cb86734',
  response: '513954a4-92e5-4128-a9d3-e91e9375a7d24'
};

const DEFAULT_MODEL = 'mistral/devstral-small-2';
export const URL = `https://vercel.com/ai-gateway/models/devstral-small-2`

export const IS_THIS_PROYECTS_DESACTIVE = true;
export const CONFIG = {
  MODEL_AI: process.env.MODEL_AI ?? DEFAULT_MODEL
};

export const API_URL = '/2/api/chat';