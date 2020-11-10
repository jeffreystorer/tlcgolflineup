import {useState, useEffect} from 'react';

export const get = item => {
  try {
    const storedItem = localStorage.getItem(item);
    if (storedItem === null) {
        return undefined;
    }
    return JSON.parse(storedItem);
  } catch (err) {
      return undefined;
  }
}

export const set = (item, value) => {
  try {
    const valueToBeStored = JSON.stringify(value);
    localStorage.setItem(item, valueToBeStored);
  } catch (err) {
    console.log(" error: " + err + " storing item: " + item)
  }
};
 
export const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    get(localStorageKey) || ''
  );
 
  useEffect(() => {
    set(localStorageKey, value);
  }, [value, localStorageKey]);
 
  return [value, setValue];
};



