"use client";

import { useEffect, useState } from "react";

/**
 * Hook untuk debounce value - delay update value sampai user selesai input
 * Berguna untuk search input, autocomplete, dll
 * @param value - nilai yang akan di-debounce
 * @param delay - delay dalam milliseconds (default: 500)
 * @returns debouncedValue - nilai yang sudah di-debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook untuk throttle function - limit function execution
 * @param callback - fungsi yang akan di-throttle
 * @param delay - delay dalam milliseconds
 * @returns throttledCallback - fungsi yang sudah di-throttle
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500
): T {
  const [lastRun, setLastRun] = useState(Date.now());

  return ((...args: any[]) => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      setLastRun(now);
      callback(...args);
    }
  }) as T;
}