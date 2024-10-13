// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();

  // Set the required headers
  res.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  res.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

  return res;
}

// Define the paths where the middleware should apply
export const config = {
  matcher: [
    '/', // Add paths where you need the headers
    // or simply use '/' to apply it to all routes
  ],
};
