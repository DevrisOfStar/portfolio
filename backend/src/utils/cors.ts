import type { Env } from '../index';

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

interface CorsOptions {
  methods: string;
  headers?: string;
}

function parseAllowedOrigins(env: Env): Set<string> {
  const configuredOrigins = [env.ALLOWED_ORIGIN, env.ALLOWED_ORIGINS]
    .filter(Boolean)
    .flatMap((value) => value!.split(','))
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...configuredOrigins]);
}

export function createCorsHeaders(request: Request, env: Env, options: CorsOptions): Headers {
  const headers = new Headers({
    'Access-Control-Allow-Methods': options.methods,
    'Access-Control-Allow-Headers': options.headers || 'Content-Type',
  });

  const origin = request.headers.get('Origin');
  if (origin && parseAllowedOrigins(env).has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }

  return headers;
}

export function createJsonHeaders(corsHeaders: Headers): Headers {
  const headers = new Headers(corsHeaders);
  headers.set('Content-Type', 'application/json');
  return headers;
}
