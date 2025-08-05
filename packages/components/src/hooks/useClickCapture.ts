import { useState, useRef, useEffect } from 'react';

const useClickCapture = (triggerTimeout = 0) => {
  const [clicked, setClicked] = useState(false);
  const clickCaptureRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    setTimeout(() => {
      setClicked(true);
    }, triggerTimeout);
  };
  useEffect(() => {
    const ref = clickCaptureRef.current;
    ref?.addEventListener('click', clickHandler, false);
    return () => {
      ref?.removeEventListener('click', clickHandler, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCaptureRef]);

  return { clickCaptureRef, clicked };
};

export default useClickCapture;
