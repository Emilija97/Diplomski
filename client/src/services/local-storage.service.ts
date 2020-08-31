
export function setItemToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getItemFromLocalStorage<T>(key: string): T | null {
  const item: string | null = localStorage.getItem(key);
  if (item !== null && item !== "") return JSON.parse(item as string) as T;
  else return null;
}

export function removeItemFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export const USER_DATA_KEY = 'User data key';
export const OPENED_ORDER_KEY = "Opened order key";