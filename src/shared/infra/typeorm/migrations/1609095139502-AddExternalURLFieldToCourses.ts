import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddExternalURLFieldToCourses1609095139502
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses',
      new TableColumn({
        name: 'external_link',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('courses', 'external_link');
  }
}
