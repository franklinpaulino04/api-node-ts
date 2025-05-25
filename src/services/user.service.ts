import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import {IsNull} from "typeorm";

class UserServiceClass {
    private repo = AppDataSource.getRepository(User);

    /**
     * Create a new user
     * @param data
     */
    async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
        const [data, total] = await this.repo.findAndCount({
            where: { deletedAt: IsNull() },
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'DESC' },
        });

        return {
            data,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    /**
     * Find a user by ID
     * @param id
     */
    findById(id: number) {
        return this.repo.findOneBy({ id });
    }

    /**
     * Find a user by email
     * @param email
     */
    create(data: Partial<User>) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }

    /**
     * Update a user
     * @param id
     * @param data
     */
    update(id: number, data: Partial<User>) {
        return this.repo.update(id, data);
    }

    /**
     * Delete a user
     * @param id
     */
    delete(id: number) {
        return this.repo.softDelete(id);
    }
}

export const UserService = new UserServiceClass();