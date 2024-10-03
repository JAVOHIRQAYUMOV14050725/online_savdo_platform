import { Sequelize } from 'sequelize';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const sequelizeConfig = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT as 'postgres',
  username: process.env.DB_USER || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  password: process.env.DB_PASSWORD || '4545',
  database: process.env.DB_NAME || 'nahot',
});

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

export { sequelizeConfig, redis };
