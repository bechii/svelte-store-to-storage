export interface IStore<T> {
  subscribe(callback: (value: T) => void): () => void;
  set(value: T): void;
}

type StorageType = 'local' | 'session';

function syncToStorage<T>(store: IStore<T>, key: string, type: StorageType, handleStorageValue?: (value: T) => void): void {
  const storage = type === 'local' ? localStorage : sessionStorage;
  const storageValue = storage.getItem(key);
  if (storageValue != null) {
    const parsedValue = JSON.parse(storageValue);
    if (handleStorageValue) {
      handleStorageValue(parsedValue);
    } else {
      store.set(parsedValue);
    }
  }
  store.subscribe((value: T) => {
    storage.setItem(key, JSON.stringify(value));
  });
}

export function syncToLocalStorage<T>(store: IStore<T>, key: string, handleStorageValue?: (value: T) => void): void {
  syncToStorage(store, key, 'local', handleStorageValue);
}

export function syncToSessionStorage<T>(store: IStore<T>, key: string, handleStorageValue?: (value: T) => void): void {
  syncToStorage(store, key, 'session', handleStorageValue);
}
