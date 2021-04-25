import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddTournamentInitializedFieldToTournamentColumns1619310540061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tournamentColumns',
      new TableColumn({
        name: 'tournament_initialized',
        type: 'boolean',
        default: false,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tournamentColumns', 'tournament_initialized');
  }
}
