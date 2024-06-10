import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class registrationPets1717866163274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pets',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'whatsapp',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'ad_title',
            type: 'varchar',
          },
          {
            name: 'species',
            type: 'varchar',
          },
          {
            name: 'breed',
            type: 'varchar',
            default: "'Não informar'",
          },
          {
            name: 'sex',
            type: 'varchar',
          },
          {
            name: 'castrated',
            type: 'varchar',
            default: "'Não informar'",
          },
          {
            name: 'color_animal',
            type: 'varchar',
          },
          {
            name: 'info_pet',
            type: 'varchar',
          },
          {
            name: 'info_donation',
            type: 'varchar',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pets');
  }
}
