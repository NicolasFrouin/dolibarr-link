import { NextRequest } from 'next/server';

async function handle(req: NextRequest) {
  const h = {};
  let b = null;

  for (const [key, value] of req.headers) {
    h[key] = value;
  }

  try {
    b = await req.json();
  } catch (e1) {
    try {
      b = await req.text();
    } catch (e2) {
      b = 'error';
    }
  }

  return Response.json(
    {
      method: req.method,
      query: req.nextUrl.search,
      url: req.nextUrl.href,
      cache: req.cache,
      creds: req.credentials,
      integrity: req.integrity,
      referrer: req.referrer,
      referrerPolicy: req.referrerPolicy,
      headers: h,
      cookies: req.cookies.getAll(),
      body: b,
    },
    { status: 200 }
  );
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
export const PATCH = handle;
export const HEAD = handle;
export const OPTIONS = handle;
