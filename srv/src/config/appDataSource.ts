import { Tarea } from '../entity/Tarea';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Tarea],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
