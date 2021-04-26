import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddFKTournamentToPublications1619456859776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey(
        'publications',
        new TableForeignKey({
          name: 'PublicationTournament', // nome da FK, serve para referenciar numa exclusão pelo QueryRunner se necessário
          columnNames: ['tournament_id'], // coluna que vai virar FK
          referencedColumnNames: ['id_tournament'], // coluna PK da primeira tabela
          referencedTableName: 'tournaments', // nome da tabela que possui a PK
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('publications', 'PublicationTournament');
    }

}
