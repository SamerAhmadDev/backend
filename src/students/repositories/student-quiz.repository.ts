import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import {
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
}
