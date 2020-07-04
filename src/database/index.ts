import { createConnection } from 'typeorm';
import path from 'path';

createConnection({
  type: 'mysql',
  port: 3306,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    process.env.NODE_ENV === 'development'
      ? './src/models/*.ts'
      : path.resolve(__dirname, '..', 'models', '*.js'),
  ],
  migrations: ['./src/database/migrations/*.ts'],
  cli: { migrationsDir: './src/database/migrations' },
});
