import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createImages1601404945917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
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
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'pet_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'ImagePets',
            columnNames: ['pet_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pets',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
