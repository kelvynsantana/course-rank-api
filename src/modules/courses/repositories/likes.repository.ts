import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILikesRepository } from 'src/modules/courses/interfaces/ILikesRepository.interface';
import { Repository } from 'typeorm';
import { LikeCourses } from '../entities/likeCourse.entity';

@Injectable()
export class LikesRepository implements ILikesRepository {
  constructor(
    @InjectRepository(LikeCourses)
    private likeCourseReposiotry: Repository<LikeCourses>,
  ) {}

  async likeCourse(user_id: string, course_id: string): Promise<LikeCourses> {
    const like = await this.likeCourseReposiotry.create({
      user_id,
      course_id,
    });

    await this.likeCourseReposiotry.save(like);

    return like;
  }

  async findLikeByUserAndCourse(
    user_id: string,
    course_id: string,
  ): Promise<LikeCourses | undefined> {
    const courseLiked = await this.likeCourseReposiotry.findOne({
      where: { user_id, course_id },
    });

    return courseLiked;
  }
}
