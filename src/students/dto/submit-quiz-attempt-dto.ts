import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { StudentQuizAnswerInput } from '../entities/student-quiz.entity';

export class SubmitQuizAttemptDto {
  @ApiProperty()
  @IsNotEmpty()
  answers: StudentQuizAnswerInput[];
}
