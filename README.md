[![NPM Version](https://img.shields.io/npm/v/svelte-store2storage.svg?style=for-the-badge)](https://www.npmjs.com/package/svelte-store2storage)

# svelte-store2storage

A functional approach to sync stores to local or session storage

## 💾 Install

```bash
npm i svelte-store2storage
```

## ⚡ Quick example

```
// stores.ts
import { writable } from 'svelte/store';
import { syncToLocalStorage } from 'svelte-store2storage';

export const personStore = writable({
  name: 'John Doe'
});

syncToLocalStorage(personStore, 'storage_key');
```

## 🔨 API

```
interface EncodingOptions<T> {
  encode?: (value: T) => string | undefined;
  decode?: (value: string) => T;
}

syncToLocalStorage<T>(store: IStore<T>, key: string, encodingOptions?: EncodingOptions<T>): () => void
syncToSessionStorage<T>(store: IStore<T>, key: string, encodingOptions?: EncodingOptions<T>): () => void
```

```
// stores.ts

import { BooleanStore } from 'butik';

export const store = new BooleanStore(false);

syncToLocalStorage(store, 'storage_key');
```

Utility methods to sync stores with localStorage and sessionStorage which returns a callback to unsync again.
Besides receiving a store and a storage key as parameters, they can also have custom encoding logic.
If no encoding options are passed, JSON.stringify and JSON.parse is used.
If you are using [SvelteKit](https://github.com/sveltejs/kit), remember to wrap the methods in `if (browser)`.
