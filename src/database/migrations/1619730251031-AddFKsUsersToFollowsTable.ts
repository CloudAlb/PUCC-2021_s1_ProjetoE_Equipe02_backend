import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddFKsUsersToFollowsTable1619730251031
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'follows',
      new TableForeignKey({
        name: 'follows_user_following', // nome da FK, serve para referenciar numa exclusão pelo QueryRunner se necessário
        columnNames: ['user_id_following'], // coluna que vai virar FK
        referencedColumnNames: ['id_user'], // coluna PK da primeira tabela
        referencedTableName: 'users', // nome da tabela que possui a PK
      }),
    );

    await queryRunner.createForeignKey(
      'follows',
      new TableForeignKey({
        name: 'follows_user_followed', // nome da FK, serve para referenciar numa exclusão pelo QueryRunner se necessário
        columnNames: ['user_id_followed'], // coluna que vai virar FK
        referencedColumnNames: ['id_user'], // coluna PK da primeira tabela
        referencedTableName: 'users', // nome da tabela que possui a PK
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('follows', 'follows_user_following');
    await queryRunner.dropForeignKey('follows', 'follows_user_followed');
  }
}
