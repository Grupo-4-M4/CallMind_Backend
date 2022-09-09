import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1662756451275 implements MigrationInterface {
    name = 'initialMigration1662756451275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "userName" character varying NOT NULL, "first_Login" boolean NOT NULL DEFAULT true, "type" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "psychologist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "img" character varying NOT NULL, "emphasis" character varying NOT NULL, "experience" character varying NOT NULL, "available_times" character varying NOT NULL, "working_days" text array NOT NULL, "registration" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_7b8523eebfcf62ca5e6ea1f3e9" UNIQUE ("userId"), CONSTRAINT "PK_8306b92077e64754cda381819cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "available" boolean NOT NULL DEFAULT true, "link" character varying, "patientId" uuid, "psychologistId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "img" character varying NOT NULL, "age" integer NOT NULL, "status" character varying NOT NULL, "schooling" character varying NOT NULL, "profession" character varying NOT NULL, "complaint" character varying NOT NULL, "medication" character varying NOT NULL, "disease" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_6636aefca0bdad8933c7cc3e39" UNIQUE ("userId"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "charts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "description" character varying NOT NULL, "patientId" uuid, "psychologistId" uuid, CONSTRAINT "PK_fa7124425552d2d37725307008b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "psychologist" ADD CONSTRAINT "FK_7b8523eebfcf62ca5e6ea1f3e95" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_3b662d86d93c5febacaf65417d6" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_49c5719beb75f46a2b9d6de53cd" FOREIGN KEY ("psychologistId") REFERENCES "psychologist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "charts" ADD CONSTRAINT "FK_209631cb4cd3dd61e6961be58d1" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "charts" ADD CONSTRAINT "FK_08a18fae2417cf46442acd26710" FOREIGN KEY ("psychologistId") REFERENCES "psychologist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charts" DROP CONSTRAINT "FK_08a18fae2417cf46442acd26710"`);
        await queryRunner.query(`ALTER TABLE "charts" DROP CONSTRAINT "FK_209631cb4cd3dd61e6961be58d1"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_49c5719beb75f46a2b9d6de53cd"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_3b662d86d93c5febacaf65417d6"`);
        await queryRunner.query(`ALTER TABLE "psychologist" DROP CONSTRAINT "FK_7b8523eebfcf62ca5e6ea1f3e95"`);
        await queryRunner.query(`DROP TABLE "charts"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "psychologist"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
