import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { DatabaseSchema } from '../types.js';

// Initialize DB
const adapter = new JSONFile<DatabaseSchema>('db.json');
const defaultData: DatabaseSchema = { responses: {} };
const db = new Low(adapter, defaultData);

(async () => {
  try {
    await db.read();
    db.data ||= { responses: {} };
  } catch (error) {
    console.error('Error reading database:', error);
  }
})();

export default db ;
