declare global {
  interface Window {
    _env_?: Record<string, string>;
  }
}

/**
 * Reads an environment variable at runtime.
 * On the client, values injected via env-config.js (window._env_) take precedence.
 * On the server and in tests, falls back to process.env.
 */
export default function getRuntimeEnv(key: string): string | undefined {
  if (typeof globalThis.window !== 'undefined') {
    const value = globalThis.window._env_?.[key];
    if (value != null && value !== '') {
      return value;
    }
  }

  return process.env[key];
}
