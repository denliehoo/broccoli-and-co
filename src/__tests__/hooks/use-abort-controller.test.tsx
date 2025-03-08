import { useAbortController } from '@/hooks/use-abort-controller';
import { act, renderHook } from '@testing-library/react';

describe('useAbortController', () => {
  it('should create a new AbortController signal', () => {
    const { result } = renderHook(() => useAbortController());

    let signal;
    act(() => {
      signal = result.current();
    });

    expect(signal).toBeInstanceOf(AbortSignal);
  });

  it('should abort the previous controller when creating a new one', () => {
    const { result } = renderHook(() => useAbortController());

    let firstSignal: AbortSignal | undefined;
    act(() => {
      firstSignal = result.current();
    });

    expect(firstSignal?.aborted).toBe(false);

    let secondSignal: AbortSignal | undefined;
    act(() => {
      secondSignal = result.current();
    });

    expect(firstSignal?.aborted).toBe(true);
    expect(secondSignal?.aborted).toBe(false);
  });

  it('should abort the controller on unmount', () => {
    const { result, unmount } = renderHook(() => useAbortController());

    let signal: AbortSignal | undefined;
    act(() => {
      signal = result.current();
    });

    expect(signal?.aborted).toBe(false);

    act(() => {
      unmount();
    });

    expect(signal?.aborted).toBe(true);
  });
});
