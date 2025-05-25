import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV !== 'production', // Synchronize only in development
    logging: false,
    entities: [User],
    migrations: ['src/migrations/**/*.ts'],
});
