import Dexie, { type EntityTable } from 'dexie';
import { type Can } from './cans.svelte';

export const db = new Dexie('CannedDatabase') as Dexie & {
  cans: EntityTable<Can, 'id'>;
};

db.version(1).stores({
  cans: '&id, text',
});
