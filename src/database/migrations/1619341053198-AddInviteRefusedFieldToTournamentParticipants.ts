import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddInviteRefusedFieldToTournamentParticipants1619341053198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tournamentParticipants',
      new TableColumn({
        name: 'invite_refused',
        type: 'boolean',
        default: false,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tournamentParticipants', 'invite_refused');
  }
}
