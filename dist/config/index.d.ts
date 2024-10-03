import { Sequelize } from 'sequelize';
import Redis from 'ioredis';
declare const sequelizeConfig: Sequelize;
declare const redis: Redis;
export { sequelizeConfig, redis };
