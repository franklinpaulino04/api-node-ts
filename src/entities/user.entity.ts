import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: 'user' | 'admin';

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    createdAt: Date;

    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    updatedAt: Date;

    @Column({ name: 'deleted_at', nullable: true, type: 'timestamp' })
    deletedAt?: Date;
}
