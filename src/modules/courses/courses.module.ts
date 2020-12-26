import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './controllers/course.controller';
import { Course } from './entities/course.entity';
import { CoursesRepository } from './repositories/courses.repository';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CoursesRepository, CoursesService],
  controllers: [CourseController],
  exports: [],
})
export class CoursesModule {}
