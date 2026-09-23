import { vi } from 'vitest';
import {
  beforeSend,
  beforeSendTransaction,
  cleanSensitiveData,
} from '../utils';

const hookHint = { source: 'test' };

const nestedSensitivePayload = {
  authorization: 'Bearer secret-token',
  nested: {
    apiKey: '12345',
    keepMe: 'ok',
    list: [
      {
        password: 'hidden',
        value: 'visible',
      },
      {
        token: 'secret',
        safe: true,
      },
    ],
  },
  topLevel: 'visible',
};

const nestedSensitivePayloadSanitized = {
  nested: {
    keepMe: 'ok',
    list: [
      {
        value: 'visible',
      },
      {
        safe: true,
      },
    ],
  },
  topLevel: 'visible',
};

type PayloadHook = (event: Record<string, unknown>, hint: unknown) => unknown;

describe('sentry utils', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('removes denylisted keys recursively from objects and arrays', () => {
    const cleaned = cleanSensitiveData(nestedSensitivePayload);

    expect(cleaned).toStrictEqual(nestedSensitivePayloadSanitized);
  });

  it('does not recurse infinitely on circular references', () => {
    const circular: Record<string, unknown> = { topLevel: 'visible' };
    circular.self = circular;

    const cleaned = cleanSensitiveData(circular) as Record<string, unknown>;

    expect(cleaned.topLevel).toBe('visible');
    expect(cleaned.self).toBe(cleaned);
  });

  it('caps recursion at the max depth instead of exhausting the stack', () => {
    let deeplyNested: Record<string, unknown> = { value: 'bottom' };
    for (let i = 0; i < 40; i++) {
      deeplyNested = { nested: deeplyNested };
    }

    const cleaned = cleanSensitiveData(deeplyNested);

    let cursor: unknown = cleaned;
    let depth = 0;
    while (typeof cursor === 'object' && cursor !== null) {
      cursor = (cursor as Record<string, unknown>).nested;
      depth++;
    }
    expect(cursor).toBe('[MaxDepthExceeded]');
    expect(depth).toBeLessThan(40);
  });

  it.each([
    {
      name: 'beforeSend',
      hook: beforeSend as PayloadHook,
      payload: {
        request: {
          headers: {
            cookie: 'sessionid=abc123',
            accept: 'application/json',
          },
        },
        message: 'example',
      },
      expected: {
        request: {
          headers: {
            accept: 'application/json',
          },
        },
        message: 'example',
      },
    },
    {
      name: 'beforeSendTransaction',
      hook: beforeSendTransaction as PayloadHook,
      payload: {
        contexts: {
          trace: {
            op: 'graphql.query',
          },
        },
        user_session: 'secret-session',
        transaction: 'home',
      },
      expected: {
        contexts: {
          trace: {
            op: 'graphql.query',
          },
        },
        transaction: 'home',
      },
    },
  ])('sanitizes payload for $name', ({ hook, payload, expected }) => {
    const result = hook(payload, hookHint);

    expect(result).toStrictEqual(expected);
  });

  it('logs event and hint in development mode', () => {
    vi.stubEnv('NODE_ENV', 'development');
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const event = { message: 'hello' };
    const hint = { reason: 'unit-test' };

    beforeSend(event, hint);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Sentry event', event);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Sentry hint', hint);
  });
});
