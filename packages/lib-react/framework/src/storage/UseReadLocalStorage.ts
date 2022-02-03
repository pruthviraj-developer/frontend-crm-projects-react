import { useEffect, useState } from 'react';

type Value<T> = Map<string, T | null>;

export function useReadLocalStorage<T>(keys: string[]): Value<T> {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): Value<T> => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      const items = new Map<string, T | null>();
      for (let i = 0; i < keys.length; i++) {
        items.set(keys[i], null);
      }
      return items;
    }

    try {
      const items = new Map<string, T | null>();
      for (let i = 0; i < keys.length; i++) {
        const item = window.localStorage.getItem(keys[i]);
        items.set(keys[i], item ? (JSON.parse(item) as T) : null);
      }

      return items;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error reading localStorage key “${keys}”:`, error);
      const items = new Map<string, T | null>();
      for (let i = 0; i < keys.length; i++) {
        items.set(keys[i], null);
      }
      return items;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<Value<T>>(readValue);

  // Listen if localStorage changes
  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    // this only works for other documents, not the current one
    window.addEventListener('storage', handleStorageChange);

    // this is a custom event, triggered in writeValueToLocalStorage
    // See: useLocalStorage()
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  return storedValue;
}
