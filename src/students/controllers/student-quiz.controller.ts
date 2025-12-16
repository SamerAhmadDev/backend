import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { SubmitQuizAttemptDto } from '../dto/submit-quiz-attempt-dto';
import { StudentQuizAttemptOutput } from '../entities/student-quiz.entity';
import { StudentQuizService } from '../services/student-quiz.service';

@ApiTags('Student Quiz')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('student/quiz')
export class StudentQuizController {
  constructor(private readonly studentQuizService: StudentQuizService) {}

  @Post('/:quizId/submit')
  async submitQuizAttempt(
    @Req() req: Request,
    @Param('quizId') quizId: string,
    @Body() body: SubmitQuizAttemptDto,
  ): Promise<StudentQuizAttemptOutput> {
    const studentId = req.user!.id;
    return this.studentQuizService.submitQuizAttempt(
      studentId,
      quizId,
      body.answers,
    );
  }
}
