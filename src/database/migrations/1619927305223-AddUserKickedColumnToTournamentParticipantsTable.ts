import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddUserKickedColumnToTournamentParticipantsTable1619927305223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tournamentParticipants',
      new TableColumn({
        name: 'user_kicked',
        type: 'boolean',
        default: false,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tournamentParticipants', 'user_kicked');
  }
}
