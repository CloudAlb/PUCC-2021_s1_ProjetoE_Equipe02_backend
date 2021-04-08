import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSocials1617646181807 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'socials',
        columns: [
          {
            name: 'id_social',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          // TODO, queria que essa chave (futuramente estrangeira)
          // fosse a coluna identificadora dessa tabela
          // é possível fazer isso?
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'telegram',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'facebook',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'twitter',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'twitch',
            type: 'varchar',
            isNullable: true
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
          }
        ]
      })
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('socials');

  }

}
