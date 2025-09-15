import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLogTable1757967708227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public.ledger_log (
        id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        payload     JSONB          NOT NULL,
        status      VARCHAR(32)    NOT NULL,
        created_at  TIMESTAMPTZ    NOT NULL DEFAULT now(),
        updated_at  TIMESTAMPTZ    NOT NULL DEFAULT now()
      );
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.ledger_log;
`);
  }
}
