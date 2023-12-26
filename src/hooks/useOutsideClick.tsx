import { useEffect, useRef, RefObject } from 'react';

type EventHandler = () => void;

export const useOutsideClick = (
  handler: EventHandler,
  listenCapturing = true,
): RefObject<HTMLElement> => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
};
