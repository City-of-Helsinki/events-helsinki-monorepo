import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configureSentryTunnelListenerLimit } from '../serverUtils';

const diagnosticsChannelMock = vi.hoisted(() => {
  const subscribe = vi.fn((_listener: (message: unknown) => void) => {});
  return {
    channel: vi.fn(() => ({ subscribe })),
    subscribe,
  };
});

vi.mock('node:diagnostics_channel', () => diagnosticsChannelMock);

const getRequestListener = async () => {
  await configureSentryTunnelListenerLimit();
  const listener = diagnosticsChannelMock.subscribe.mock.calls[0]?.[0];
  if (!listener) {
    throw new Error('Expected the HTTP request listener to be subscribed');
  }
  return listener;
};

describe('configureSentryTunnelListenerLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('subscribes to HTTP request start and raises the limit for the tunnel path', async () => {
    const listener = await getRequestListener();
    const response = {
      getMaxListeners: vi.fn(() => 10),
      setMaxListeners: vi.fn(),
    };

    listener({ request: { url: '/monitoring?envelope=1' }, response });

    expect(diagnosticsChannelMock.channel).toHaveBeenCalledWith(
      'http.server.request.start'
    );
    expect(response.setMaxListeners).toHaveBeenCalledWith(15);
  });

  it.each([
    '/default/monitoring',
    '/fi/monitoring',
    '/sv/monitoring/',
    '/en/monitoring',
  ])('raises the limit for localized tunnel path %s', async (url) => {
    const listener = await getRequestListener();
    const response = {
      getMaxListeners: vi.fn(() => 10),
      setMaxListeners: vi.fn(),
    };

    listener({ request: { url }, response });

    expect(response.setMaxListeners).toHaveBeenCalledWith(15);
  });

  it('leaves non-tunnel requests unchanged', async () => {
    const listener = await getRequestListener();
    const response = {
      getMaxListeners: vi.fn(() => 10),
      setMaxListeners: vi.fn(),
    };

    listener({ request: { url: '/fi/events' }, response });

    expect(response.setMaxListeners).not.toHaveBeenCalled();
  });

  it.each([0, 15, 20])(
    'does not change an existing listener limit of %s',
    async (currentLimit) => {
      const listener = await getRequestListener();
      const response = {
        getMaxListeners: vi.fn(() => currentLimit),
        setMaxListeners: vi.fn(),
      };

      listener({ request: { url: '/monitoring' }, response });

      expect(response.setMaxListeners).not.toHaveBeenCalled();
    }
  );
});
