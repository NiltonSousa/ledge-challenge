import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTable1757702583660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;

      CREATE TABLE IF NOT EXISTS public.account (
        id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name        VARCHAR(255)   NOT NULL,
        document    VARCHAR(64)    NOT NULL,
        email       VARCHAR(255)   NOT NULL,
        credit_limit NUMERIC(14,2)  NOT NULL,
        created_at  TIMESTAMPTZ    NOT NULL DEFAULT now(),
        updated_at  TIMESTAMPTZ    NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS public.movement (
        id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        account_id   uuid            NOT NULL,
        amount       NUMERIC(14,2)   NOT NULL,
        type         VARCHAR(32)     NOT NULL,
        description  TEXT,
        created_at   TIMESTAMPTZ     NOT NULL DEFAULT now(),
        updated_at   TIMESTAMPTZ     NOT NULL DEFAULT now(),
        CONSTRAINT fk_movement_account
          FOREIGN KEY (account_id)
          REFERENCES public.account(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
      );
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.movement;
        DROP TABLE IF EXISTS public.account;
`);
  }
}
