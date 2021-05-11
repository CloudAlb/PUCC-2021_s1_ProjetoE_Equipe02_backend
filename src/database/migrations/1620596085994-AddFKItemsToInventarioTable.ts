import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddFKItemsToInventarioTable1620596085994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey(
        'inventario',
        new TableForeignKey({
          name: 'InventarioItems', // nome da FK, serve para referenciar numa exclusão pelo QueryRunner se necessário
          columnNames: ['item_id'], // coluna que vai virar FK
          referencedColumnNames: ['id_item'], // coluna PK da primeira tabela
          referencedTableName: 'items', // nome da tabela que possui a PK
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('inventario', 'InventarioItems');
    }

}
