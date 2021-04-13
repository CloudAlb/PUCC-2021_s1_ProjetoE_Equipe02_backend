import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTournaments1618346645192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'tournaments',
          columns: [
            {
              name: 'id_tournament',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'game',
              type: 'varchar',
            },
            {
              name: 'game_type',
              type: 'varchar',
            },
            {
              name: 'description',
              type: 'varchar',
            },
            {
              name: 'number_teams',
              type: 'integer',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('tournaments');
    }

}
