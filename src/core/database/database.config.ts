import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './db-config.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
  },
  test: {
    dialect: process.env.DB_DIALECT_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    database: process.env.DB_NAME_TEST,
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASS_TEST,
  },
  production: {
    dialect: process.env.DB_DIALECT_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    port: process.env.DB_PORT_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASS_PRODUCTION,
  },
};
