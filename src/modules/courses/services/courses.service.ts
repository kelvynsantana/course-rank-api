import { HttpException, Injectable } from '@nestjs/common';
import { CreateCourseDTO } from '../dtos/createCourse.dto';
import { UpdateCourseDTO } from '../dtos/updateCourse.dto';
import { Course } from '../entities/course.entity';
import { LikeCourses } from '../entities/likeCourse.entity';
import { CoursesRepository } from '../repositories/courses.repository';
import { LikesRepository } from '../repositories/likes.repository';

@Injectable()
export class CoursesService {
  constructor(
    private courseRepository: CoursesRepository,
    private likeRepository: LikesRepository,
  ) {}

  public async createCourse(newCourse: CreateCourseDTO): Promise<Course> {
    const course = await this.courseRepository.create(newCourse);

    return course;
  }

  // public async rankCourses(): Promise<Course[]> {
  //   const courses = await this.courseRepository.findAndOrderCoursesByLikes();

  //   return courses;
  // }

  public async showCourse(id: string): Promise<Course> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new HttpException('Course does not exists', 400);
    }

    return course;
  }
  public async updateCourse(
    id: string,
    { description, title, price, school }: UpdateCourseDTO,
  ): Promise<Course> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new HttpException('Course does not exists', 400);
    }
    course.title = title;
    course.description = description;
    course.price = price;
    course.school = school;

    await this.courseRepository.save(course);

    return course;
  }
  public async likeCourse(
    user_id: string,
    course_id: string,
  ): Promise<LikeCourses> {
    const course = await this.courseRepository.findById(course_id);

    if (!course) throw new HttpException('Course does not exists', 400);

    const courseLiked = await this.likeRepository.findLikeByUserAndCourse(
      user_id,
      course_id,
    );
    if (courseLiked) {
      throw new HttpException('Course already liked', 400);
    }

    const like = await this.likeRepository.likeCourse(user_id, course_id);

    return like;
  }
}
