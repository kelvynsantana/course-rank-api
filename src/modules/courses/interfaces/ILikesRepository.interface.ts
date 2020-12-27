import { LikeCourses } from '../entities/likeCourse.entity';

export interface ILikesRepository {
  likeCourse(user_id: string, course_id: string): Promise<LikeCourses>;
}
