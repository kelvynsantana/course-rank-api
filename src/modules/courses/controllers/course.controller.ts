import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/users/guards/jwt-auth.guard';
import { CreateCourseDTO } from '../dtos/createCourse.dto';
import { UpdateCourseDTO } from '../dtos/updateCourse.dto';
import { Course } from '../entities/course.entity';
import { LikeCourses } from '../entities/likeCourse.entity';
import { CoursesService } from '../services/courses.service';

@Controller('courses')
export class CourseController {
  constructor(private coursesService: CoursesService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  async create(@Body() newCourse: CreateCourseDTO): Promise<Course> {
    const course = await this.coursesService.createCourse(newCourse);

    return course;
  }

  // @Get()
  // async index(): Promise<Course[]> {
  //   return await this.coursesService.rankCourses();
  // }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Course> {
    return await this.coursesService.showCourse(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':course_id/like')
  async likeCourse(
    @Request() req: any,
    @Param('course_id') course_id: string,
  ): Promise<LikeCourses> {
    return await this.coursesService.likeCourse(req.user.id, course_id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourse: UpdateCourseDTO,
  ): Promise<Course> {
    return await this.coursesService.updateCourse(id, updateCourse);
  }
}
