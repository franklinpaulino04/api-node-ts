import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1748128872873 implements MigrationInterface {
    name = 'AutoMigration1748128872873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`deleted_at\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleted_at\``);
    }

}
