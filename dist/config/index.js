"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.sequelizeConfig = void 0;
const sequelize_1 = require("sequelize");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); 
const sequelizeConfig = new sequelize_1.Sequelize({
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    password: process.env.DB_PASSWORD || '4545',
    database: process.env.DB_NAME || 'nahot',
});
exports.sequelizeConfig = sequelizeConfig;
const redis = new ioredis_1.default({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
});
exports.redis = redis;
