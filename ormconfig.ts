import { DataSource } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import {cwd} from 'process';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [cwd() + '/src/**/*.entity.ts'],
  synchronize: false,
  migrations: [cwd() + '/src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  dropSchema: false,
};

export { config };
export default new DataSource(config);
