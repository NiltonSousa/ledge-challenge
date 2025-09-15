import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
configDotenv();
const isProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'ledger-db',
  synchronize: false,
  entities: isProd
    ? ['dist/infra/typeorm/schemas/*.js']
    : ['src/infra/typeorm/schemas/*.ts'],
  migrations: isProd
    ? ['dist/infra/typeorm/migrations/*.js']
    : ['src/infra/typeorm/migrations/*.ts'],
  logging: process.env.TYPEORM_LOGGING === 'true',
});
