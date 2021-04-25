import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTournamentColumnsTable1619039853111
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tournamentColumns',
        columns: [
          {
            name: 'id_tournamentColumns',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'tournament_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'column1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'column2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'column3',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'column4',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('tournamentColumns');
  }
}
