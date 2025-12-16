import { Injectable } from '@nestjs/common';
import {
  StudentQuizAnswerInput,
  StudentQuizAttemptOutput,
} from '../entities/student-quiz.entity';
import { StudentQuizRepository } from '../repositories/student-quiz.repository';

@Injectable()
export class StudentQuizService {
  constructor(private readonly studentQuizRepository: StudentQuizRepository) {}

  async submitQuizAttempt(
    studentId: string,
    quizId: string,
    answers: StudentQuizAnswerInput[],
  ): Promise<StudentQuizAttemptOutput> {
    return await this.studentQuizRepository.submitQuizAttempt(
      studentId,
      quizId,
      answers,
    );
  }
}
