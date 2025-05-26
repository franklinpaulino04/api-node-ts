import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { IsNull } from "typeorm";
import { createUserDto, updateUserDto } from "../schemas/user.schema";

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
     * Create a new user
     * @param data
     */
    create(data: createUserDto) {
        const user = this.repo.create({ ...data, createdAt: new Date(), updatedAt: new Date() });
        return this.repo.save(user);
    }

    /**
     * Update a user
     * @param id
     * @param data
     */
    update(id: number, data: updateUserDto) {
        return this.repo.update(id, { ...data, createdAt: new Date(), updatedAt: new Date() });
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