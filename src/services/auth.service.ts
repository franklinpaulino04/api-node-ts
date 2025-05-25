import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import {IsNull} from "typeorm";

const repo = AppDataSource.getRepository(User);

export class AuthService {

    /**
     * Register a new user
     * @param data
     */
    static async register(data: any) {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = repo.create({ ...data, password: hashed, role: data.role || 'user' });
        return repo.save(user);
    }

    /**
     * Login a user
     * @param email
     * @param password
     */
    static async login(email: string, password: string) {
        const user = await repo.findOneBy({ email, deletedAt: IsNull(), isActive: true });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        };
    }
}