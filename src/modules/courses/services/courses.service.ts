import { HttpException, Injectable } from '@nestjs/common';
import { CreateCourseDTO } from '../dtos/createCourse.dto';
import { Course } from '../entities/course.entity';
import { CoursesRepository } from '../repositories/courses.repository';

@Injectable()
export class CoursesService {
  constructor(private courseRepository: CoursesRepository) {}

  public async createCourse(newCourse: CreateCourseDTO): Promise<Course> {
    const course = await this.courseRepository.create(newCourse);

    return course;
  }

  public async rankCourses(): Promise<Course[]> {
    const courses = await this.courseRepository.findAndOrderCoursesByLikes();

    return courses;
  }

  public async likeCourse(id: string): Promise<Course> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new HttpException('Course does not exists', 400);
    }

    course.likes = course.likes + 1;

    await this.courseRepository.save(course);

    return course;
  }
}
