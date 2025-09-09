import { describe, it, expect, vi, afterEach } from 'vitest';
import getDomain from '../getDomain';

describe('getDomain', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const testCases = [
    {
      location: { protocol: 'http:', hostname: 'example.com', port: '' },
      expected: 'http://example.com',
    },
    {
      location: {
        protocol: 'https:',
        hostname: 'sub.example.com',
        port: '8080',
      },
      expected: 'https://sub.example.com:8080',
    },
    {
      location: { protocol: 'http:', hostname: 'localhost', port: '3000' },
      expected: 'http://localhost:3000',
    },
    {
      location: { protocol: 'https:', hostname: 'hel.fi', port: '' },
      expected: 'https://hel.fi',
    },
  ];

  it.each(testCases)(
    'should return "$expected" for location "$location"',
    ({ location, expected }) => {
      vi.stubGlobal('window', { location });
      expect(getDomain()).toBe(expected);
    }
  );
});
