import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNumberOfParticipantsFieldToTournaments1619038939442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tournaments',
      new TableColumn({
        name: 'number_participants',
        type: 'integer',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tournaments', 'number_participants');
  }
}
