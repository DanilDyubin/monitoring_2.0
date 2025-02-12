import { useEffect } from 'react';

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (!e.composedPath().includes(ref.current)) {
        handler(e);
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};
