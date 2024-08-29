/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { getExpirationTime } from '../utils/jwtToken';

function usePreview(token: string): {
  minutesLeft: number;
} {
  const [minutesLeft, setMinutesLeft] = useState(
    Math.ceil(getExpirationTime(token) / 60)
  );
  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMinutesLeft((t: number) => t - 1);
    }, 1000 * 60);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (minutesLeft <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [minutesLeft]);

  return { minutesLeft };
}

export default usePreview;
