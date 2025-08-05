// This file provides a browser-compatible mock for the 'https' module.
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable no-console */

const mockHttps = {
  // Mock the Agent class if your code uses `new https.Agent()`
  Agent: class MockAgent {},

  // Mock 'get' method if your code calls `https.get()`
  get: (url, options, callback) => {
    console.warn('Mocked https.get called:', url);
    // Provide a minimal mock response object that might be returned.
    // This is a simplified version, adapt if your code expects more methods/events.
    const mockResponse = {
      statusCode: 200,
      headers: {},
      on: (event, listener) => {
        if (event === 'data') listener('mock data');
        if (event === 'end') listener();
      },
      end: () => {},
    };
    // Call the callback immediately with the mock response
    if (typeof options === 'function') {
      // Handle optional options argument
      options(mockResponse);
    } else if (typeof callback === 'function') {
      callback(mockResponse);
    }
    return { on: vi.fn(), end: vi.fn(), write: vi.fn(), abort: vi.fn() }; // Return a mock request object
  },

  // Mock 'request' method if your code calls `https.request()`
  request: (options, callback) => {
    console.warn('Mocked https.request called:', options.hostname || options);
    // Similar to get, provide a mock response and a mock request object.
    const mockResponse = {
      statusCode: 200,
      headers: {},
      on: (event, listener) => {
        if (event === 'data') listener('mock data');
        if (event === 'end') listener();
      },
      end: () => {},
    };
    if (typeof options === 'function') {
      // Handle optional options argument
      options(mockResponse);
    } else if (typeof callback === 'function') {
      callback(mockResponse);
    }
    return { on: vi.fn(), end: vi.fn(), write: vi.fn(), abort: vi.fn() }; // Return a mock request object
  },

  // Add any other specific properties or methods from 'https' that your code imports or uses
  // For example, if you import { Server } from 'https':
  // Server: class MockServer {},
};

// IMPORTANT: Export based on how your app imports it.
// If your app uses `import https from "https";` (default import)
export default mockHttps;

// If your app uses `import { Agent, request } from "https";` (named imports)
export const Agent = mockHttps.Agent;
export const get = mockHttps.get;
export const request = mockHttps.request;
