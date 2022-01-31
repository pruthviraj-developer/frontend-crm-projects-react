import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Value<T> = T | null;
type SetValue<T> = Dispatch<SetStateAction<T | null>>;

export function useSessionStorage<T>(
  key: string,
  initialValue: Value<T>
): [T | null, SetValue<T>] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): Value<T> => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      // console.warn(`Error reading session storage key “${key}”:`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<Value<T>>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = (value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window == 'undefined') {
      // console.warn(
      //   `Tried setting sessionStorage key “${key}” even though environment is not a client`
      // );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      window.sessionStorage.setItem(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      // window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      // eslint-disable-next-line no-console
      // console.warn(`Error setting session key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setStoredValue(readValue());
  //   };

  //   // this only works for other documents, not the current one
  //   window.addEventListener('storage', handleStorageChange);

  //   // this is a custom event, triggered in writeValueToLocalStorage
  //   window.addEventListener('session-storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //     window.removeEventListener('local-storage', handleStorageChange);
  //   };
  // }, []);

  return [storedValue, setValue];
}
