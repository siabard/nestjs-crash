import { MigrationInterface, QueryRunner } from "typeorm";

export class loginNullable1656391029942 implements MigrationInterface {
    name = 'loginNullable1656391029942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "age" integer, "username" varchar NOT NULL DEFAULT (''), "password" varchar NOT NULL DEFAULT (''))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "age") SELECT "id", "name", "age" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "age" integer)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "age") SELECT "id", "name", "age" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
