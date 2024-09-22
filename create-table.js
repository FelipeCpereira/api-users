import { sql } from './db.js'

sql`
  CREATE TABLE cars (
      id text PRIMARY KEY,
      model character varying(255),
      color character varying(255),
      price character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})