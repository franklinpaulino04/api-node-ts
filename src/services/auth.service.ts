import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import {IsNull} from "typeorm";
import {LoginDto} from "../schemas/login.dto";
import {CreateUserDto} from "../schemas/user.schema";

const repo = AppDataSource.getRepository(User);

export class AuthService {

    /**
     * Register a new user
     * @param data
     */
    static async register(data: CreateUserDto) {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = repo.create({ ...data, password: hashed, role: data.role || 'user' });
        return repo.save(user);
    }

    /**
     * Login a user
     * @param data
     */
    static async login(data: LoginDto) {
        const { email, password } = data;
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