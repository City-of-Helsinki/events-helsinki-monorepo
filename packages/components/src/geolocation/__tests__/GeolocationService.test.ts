import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { GeolocationService } from '../GeolocationService';

describe('GeolocationService', () => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn(),
  };

  beforeEach(() => {
    vi.stubGlobal('navigator', {
      geolocation: mockGeolocation,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should resolve with position on successful geolocation fetch', async () => {
    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 60.16952,
        longitude: 24.93545,
        accuracy: 1.0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        toJSON: function () {
          throw new Error('Function not implemented.');
        },
      },
      timestamp: Date.now(),
      toJSON: function () {
        throw new Error('Function not implemented.');
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => {
      success(mockPosition);
    });

    const service = new GeolocationService();
    await expect(service.getCurrentPosition()).resolves.toStrictEqual({
      latitude: mockPosition.coords.latitude,
      longitude: mockPosition.coords.longitude,
    });
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  it('should reject with an error on failed geolocation fetch', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockPositionError: GeolocationPositionError = {
      code: 1, // PERMISSION_DENIED
      message: 'User denied Geolocation',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce((_, error) => {
      error?.(mockPositionError);
    });

    const service = new GeolocationService();
    await expect(service.getCurrentPosition()).rejects.toStrictEqual(
      mockPositionError
    );
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Failed to use geolocation: User denied Geolocation'
      )
    );
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should reject if geolocation is not available on navigator', async () => {
    vi.stubGlobal('navigator', {}); // Geolocation is not available

    const service = new GeolocationService();

    await expect(service.getCurrentPosition()).rejects.toThrow(
      "Cannot read properties of undefined (reading 'getCurrentPosition')"
    );
  });
});
