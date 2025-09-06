import { readable } from 'svelte/store';
import { liveQuery } from 'dexie';
import { db } from './db';

export class Can {
  public text = $state('');

  constructor(
    public readonly id: string,
    text: string,
  ) {
    this.text = text;
  }
}

export const cans = readable<Can[]>([], (set) => {
  const sub = liveQuery(async () =>
    (await db.cans.toArray()).map(({ id, text }) => new Can(id, text)),
  ).subscribe(set);
  return () => sub.unsubscribe();
});

export const addCan = async (text: string) => {
  await db.cans.add({ id: crypto.randomUUID(), text });
};

export const updateCan = async (id: string, text: string) => {
  await db.cans.update(id, { text });
};

export const deleteCan = async (id: string) => {
  await db.cans.delete(id);
};
