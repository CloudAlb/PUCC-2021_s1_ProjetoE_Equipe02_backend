import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePublications1618347203738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'publications',
          columns: [
            {
              name: 'id_publication',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'tournament_id',
              type: 'uuid',
              isNullable: true
            },
            // {
            //   name: 'description',
            //   type: 'varchar',
            // },
            // {
            //   name: 'likes',
            //   type: 'integer',
            // },
            // {
            //   name: 'comment_id',
            //   type: 'varchar',
            // },
            // {
            //   name: 'shares',
            //   type: 'integer',
            // },
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
      await queryRunner.dropTable('publications');
    }

}
