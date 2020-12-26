import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCourseDTO } from '../dtos/createCourse.dto';
import { Course } from '../entities/course.entity';
import { CoursesService } from '../services/courses.service';

@Controller('courses')
export class CourseController {
  constructor(private coursesService: CoursesService) {}
  @Post()
  @HttpCode(201)
  async create(@Body() newCourse: CreateCourseDTO): Promise<Course> {
    const course = await this.coursesService.createCourse(newCourse);

    return course;
  }

  @Get()
  async index(): Promise<Course[]> {
    return await this.coursesService.rankCourses();
  }

  @Put(':id')
  async likeCourse(@Param('id') id: string): Promise<Course> {
    return await this.coursesService.likeCourse(id);
  }
}
