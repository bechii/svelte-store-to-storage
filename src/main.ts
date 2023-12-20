export interface IStore<T> {
  subscribe(listener: (value: T) => void): () => void;
  set(value: T): void;
}

type StorageType = 'local' | 'session';

interface EncodingOptions<T> {
  encode?: (value: T) => string | undefined;
  decode?: (value: string) => T;
}

function syncToStorage<T>(
  store: IStore<T>,
  key: string,
  type: StorageType,
  encodingOptions?: EncodingOptions<T>
): () => void {
  const storage = type === 'local' ? localStorage : sessionStorage;
  const storageValue = storage.getItem(key);
  if (storageValue != null) {
    const decodedValue = encodingOptions?.decode?.(storageValue) ?? (JSON.parse(storageValue) as T);
    store.set(decodedValue);
  }
  return store.subscribe((value: T) => {
    const encodedValue = encodingOptions?.encode?.(value) ?? JSON.stringify(value);
    storage.setItem(key, encodedValue);
  });
}

export function syncToLocalStorage<T>(
  store: IStore<T>,
  key: string,
  encodingOptions?: EncodingOptions<T>
): () => void {
  return syncToStorage(store, key, 'local', encodingOptions);
}

export function syncToSessionStorage<T>(
  store: IStore<T>,
  key: string,
  encodingOptions?: EncodingOptions<T>
): () => void {
  return syncToStorage(store, key, 'session', encodingOptions);
}
