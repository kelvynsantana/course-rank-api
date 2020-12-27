import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './controllers/course.controller';
import { Course } from './entities/course.entity';
import { LikeCourses } from './entities/likeCourse.entity';
import { CoursesRepository } from './repositories/courses.repository';
import { LikesRepository } from './repositories/likes.repository';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, LikeCourses])],
  providers: [CoursesRepository, LikesRepository, CoursesService],
  controllers: [CourseController],
  exports: [],
})
export class CoursesModule {}
