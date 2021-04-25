import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddFKTournamentToTournamentParticipants1618755447098 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'tournamentParticipants',
      new TableForeignKey({
        name: 'TournamentParticipant_Tournament', // nome da FK, serve para referenciar numa exclusão pelo QueryRunner se necessário
        columnNames: ['tournament_id'], // coluna que vai virar FK
        referencedColumnNames: ['id_tournament'], // coluna PK da primeira tabela
        referencedTableName: 'tournaments', // nome da tabela que possui a PK
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tournamentParticipants', 'TournamentParticipant_Tournament');
  }
}
