import { streamText } from 'ai';
import rateLimit from 'express-rate-limit';
import { NextResponse, type NextRequest } from 'next/server';
import { CONFIG } from '@/app/2/utils/consts';
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // -> 1 minuto
  limit: 5, // -> 5 peticiones por IP por minuto
  message: {
    error: 'Demasiadas solicitudes, por favor intenta de nuevo más tarde.'
  },
  legacyHeaders: false,
  standardHeaders: 'draft-8' // devuelve headers estándard RateLimit-*
});

/* 
// TODO:
export const aiRouter = Router()
aiRouter.use(aiRateLimiter) 

*/

export async function POST(req: NextRequest) {
  const data = req.body;
  console.log(data);

  return NextResponse.json(data);
}
