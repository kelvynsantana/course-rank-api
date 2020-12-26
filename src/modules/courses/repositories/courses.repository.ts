import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICoursesRepository } from 'src/modules/interfaces/ICousesRepository.interface';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from '../dtos/createCourse.dto';
import { Course } from '../entities/course.entity';

@Injectable()
export class CoursesRepository implements ICoursesRepository {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findById(id: string): Promise<Course | undefined> {
    const course = await this.courseRepository.findOne({ where: { id } });

    return course;
  }
  async findByTitle(title: string): Promise<Course | undefined> {
    const course = await this.courseRepository.findOne({ where: { title } });

    return course;
  }
  async findBySchoolName(schoolName: string): Promise<Course | undefined> {
    const course = await this.courseRepository.findOne({
      where: { school: schoolName },
    });

    return course;
  }

  async findAndOrderCoursesByLikes(): Promise<Course[]> {
    const courses = await this.courseRepository.find({
      order: {
        likes: 'DESC',
      },
    });

    return courses;
  }
  async create(newCourse: CreateCourseDTO): Promise<Course> {
    const course = await this.courseRepository.create(newCourse);

    await this.save(course);

    return course;
  }
  async save(course: Course): Promise<Course> {
    const newCourse = await this.courseRepository.save(course);

    return newCourse;
  }
}
