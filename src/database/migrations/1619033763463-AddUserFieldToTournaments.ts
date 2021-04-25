import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserFieldToTournaments1619033763463
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tournaments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tournaments', 'user_id');
  }
}
