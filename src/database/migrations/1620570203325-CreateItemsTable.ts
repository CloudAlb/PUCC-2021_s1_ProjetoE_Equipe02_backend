import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateItemsTable1620570203325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'items',
          columns: [
            {
              name: 'id_item',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'nome',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'tipo',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'asset',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'preco',
              type: 'integer',
              isNullable: false,
            },
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
      await queryRunner.dropTable('items');
    }

}
