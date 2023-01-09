import { logger } from '../loggers/logger';
import type { Coordinates } from '../types';

class GeolocationService {
  getCurrentPosition(): Promise<Coordinates> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          logger.error(`Failed to use geolocation: ${error.message}`);
          reject(error);
        }
      )
    );
  }
}

export default new GeolocationService();
