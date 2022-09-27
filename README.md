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
syncToLocalStorage<T>(store: IStore<T>, key: string, handleStorageValue?: (value: T) => void): void
syncToSessionStorage<T>(store: IStore<T>, key: string, handleStorageValue?: (value: T) => void): void
```

A custom handler can be added which has the current value in storage as argument. <br>
If it is omitted, the store will be set to the value in storage if it exists. <br>
If you are using [SvelteKit](https://github.com/sveltejs/kit), remember to wrap the methods in `if (browser)`.
