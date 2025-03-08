import { useEffect, useRef } from 'react';
export const useAbortController = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const createAbortController = () => {
    abort();
    const newController = new AbortController();
    abortControllerRef.current = newController;
    return newController.signal;
  };

  useEffect(() => {
    return () => abort();
  }, []);

  return createAbortController;
};

/*
 * To use:
const Component = () => {
    const createAbortController = useAbortController();

    const onCallApi = async () => {
        const signal = createAbortController();
        try {
            await apiCall(signal);
        } catch (error) {
            console.error(error);
        }
    }

    return <>...</>;
}
*/
