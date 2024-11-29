import { NextRequest, NextResponse } from 'next/server';
import { rateLimitMap, requestLimit, resetDelay } from './config';

export default function singleRateLimiter(
  handler: (req: NextRequest, res: NextResponse) => any // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  return (req: NextRequest, res: NextResponse) => {
    // @ts-expect-error -- Is OK
    const ip = req.headers.get('x-forwarded-for') || req.connection.remoteAddress;

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > resetDelay) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= requestLimit) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    ipData.count += 1;

    return handler(req, res);
  };
}
