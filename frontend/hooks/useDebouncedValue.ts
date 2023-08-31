import { useEffect, useState } from "react";

export default function useDebouncedValue<T>(value: T, debounceTime = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const debounceTimer = setTimeout(
      () => setDebouncedValue(value),
      debounceTime
    );

    return () => clearTimeout(debounceTimer);
  }, [value, debounceTime]);

  return debouncedValue;
}
