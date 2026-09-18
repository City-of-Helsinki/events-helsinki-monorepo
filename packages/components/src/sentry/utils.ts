import snakeCase from 'lodash/snakeCase';

// https://github.com/getsentry/sentry-python/blob/8094c9e4462c7af4d73bfe3b6382791f9949e7f0/sentry_sdk/scrubber.py#L14
const DEFAULT_DENYLIST = [
  // stolen from relay
  'password',
  'passwd',
  'secret',
  'api_key',
  'apikey',
  'auth',
  'credentials',
  'mysql_pwd',
  'privatekey',
  'private_key',
  'token',
  'ip_address',
  'session',
  // django
  'csrftoken',
  'sessionid',
  // wsgi
  'remote_addr',
  'x_csrftoken',
  'x_forwarded_for',
  'set_cookie',
  'cookie',
  'authorization',
  'x_api_key',
  'x_forwarded_for',
  'x_real_ip',
  // other common names used in the wild
  'aiohttp_session', // aiohttp
  'connect.sid', // Express
  'csrf_token', // Pyramid
  'csrf', // (this is a cookie name used in accepted answers on stack overflow)
  '_csrf', // Express
  '_csrf_token', // Bottle
  'PHPSESSID', // PHP
  '_session', // Sanic
  'symfony', // Symfony
  'user_session', // Vue
  '_xsrf', // Tornado
  'XSRF-TOKEN', // Angular, Laravel
];

const SENTRY_DENYLIST = new Set(
  DEFAULT_DENYLIST
  // Custom denylist entries for this project can be added here
);

const MAX_CLEAN_DEPTH = 32;

export const cleanSensitiveData = (
  data: unknown,
  visited = new WeakMap<object, unknown>(),
  depth = 0,
  maxDepth = MAX_CLEAN_DEPTH
): unknown => {
  if (depth > maxDepth) {
    return '[MaxDepthExceeded]';
  }

  if (typeof data !== 'object' || data === null) {
    return data;
  }

  // To avoid infinite recursion for circular references
  if (visited.has(data)) {
    return visited.get(data);
  }

  if (Array.isArray(data)) {
    const result: unknown[] = [];
    visited.set(data, result);
    for (const item of data) {
      result.push(cleanSensitiveData(item, visited, depth + 1, maxDepth));
    }
    return result;
  }

  const result: Record<string, unknown> = {};
  visited.set(data, result);

  for (const [key, value] of Object.entries(data)) {
    if (SENTRY_DENYLIST.has(key) || SENTRY_DENYLIST.has(snakeCase(key))) {
      continue; // omit sensitive key
    }
    result[key] = cleanSensitiveData(value, visited, depth + 1, maxDepth);
  }

  return result;
};

const cleanSentryPayload = <T extends object>(payload: T): T =>
  cleanSensitiveData(payload) as T;

/**
 * Sentry beforeSend hook - processes events before sending to Sentry
 * Logs events in development mode for debugging
 */
export const beforeSend = <T extends object>(event: T, hint: unknown): T => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Sentry event', event);
    // eslint-disable-next-line no-console
    console.log('Sentry hint', hint);
  }
  return cleanSentryPayload(event);
};

/**
 * Sentry beforeSendTransaction hook - processes transactions before sending to Sentry
 * Logs transactions in development mode for debugging
 */
export const beforeSendTransaction = <T extends object>(
  event: T,
  _hint?: unknown
): T => cleanSentryPayload(event);
