import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddActiveToPets1617819642369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pets',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pets', 'active');
  }
}
