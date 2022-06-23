import { MigrationInterface, QueryRunner } from "typeorm";

export class todosTitle1655944163418 implements MigrationInterface {
    name = 'todosTitle1655944163418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "contents" varchar NOT NULL, "title" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_todo"("id", "contents") SELECT "id", "contents" FROM "todo"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`ALTER TABLE "temporary_todo" RENAME TO "todo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME TO "temporary_todo"`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "contents" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "todo"("id", "contents") SELECT "id", "contents" FROM "temporary_todo"`);
        await queryRunner.query(`DROP TABLE "temporary_todo"`);
    }

}