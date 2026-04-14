import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // state to store our value
  // pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      // get from local storage by key
      const item = window.localStorage.getItem(key);
      // parse stored json or if none return initialValue
      if (item) {
        setStoredValue(JSON.parse(item));
      }
      setIsHydrated(true);
    } catch (error) {
      // if error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      setIsHydrated(true);
    }
  }, [key]);

  // return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // save state
      setStoredValue(valueToStore);
      // save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, isHydrated] as const;
}
