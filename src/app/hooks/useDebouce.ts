import { useEffect, useState } from "react";
/**
 *
 * This hook enables searching while typing without sending too
 * many calls to the api.
 *
 * @param value the state value to update after the given delay
 * @param delay the given delay
 * @returns
 */
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
