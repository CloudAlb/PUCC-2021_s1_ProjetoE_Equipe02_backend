import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTournamentEndedFieldToTournamentColumns1619316872218
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tournamentColumns',
      new TableColumn({
        name: 'tournament_ended',
        type: 'boolean',
        default: false,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tournamentColumns', 'tournament_ended');
  }
}
