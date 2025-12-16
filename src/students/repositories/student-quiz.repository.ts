import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import {
  LatestQuizAttemptRow,
  StudentQuizAnswerInput,
  StudentQuizAttemptOutput,
} from '../entities/student-quiz.entity';

@Injectable()
export class StudentQuizRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async submitQuizAttempt(
    studentId: string,
    quizId: string,
    answers: StudentQuizAnswerInput[],
  ): Promise<StudentQuizAttemptOutput> {
    const { data, error } = await this.supabase.client
      .rpc('submit_quiz_attempt', {
        p_student_id: studentId,
        p_quiz_id: quizId,
        p_answers: answers,
      })
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as StudentQuizAttemptOutput;
  }

  async getLatestQuizAttempts(
    studentId: string,
    quizIds: string[],
  ): Promise<LatestQuizAttemptRow[]> {
    if (quizIds.length === 0) return [];

    const { data, error } = await this.supabase.client.rpc(
      'get_latest_quiz_attempts_for_student',
      {
        p_student_id: studentId,
        p_quiz_ids: quizIds,
      },
    );

    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch latest quiz attempts: ${error.message}`,
      );
    }

    return (data ?? []) as LatestQuizAttemptRow[];
  }
}
