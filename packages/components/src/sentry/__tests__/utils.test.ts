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
