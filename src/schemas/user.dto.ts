import { z } from 'zod';

export const UserResponseDTO = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['user', 'admin']),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type UserResponse = z.infer<typeof UserResponseDTO>;
