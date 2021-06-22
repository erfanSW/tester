import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1602342727235 implements MigrationInterface {
    name = 'PostRefactoring1602342727235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
