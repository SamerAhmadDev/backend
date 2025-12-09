import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationOptions, SortOptions } from 'src/common/interfaces';
import { CreateQuizDto } from './dto/create-quiz-dto';
import { UpdateQuizDto } from './dto/update-quiz-dto';
import { Quiz, QuizWithRelations } from './entities/quizzes.entity';
import { QuizzesRepository } from './quizzes.repository';

@Injectable()
export class QuizzesService {
  constructor(private readonly quizzesRepository: QuizzesRepository) {}

  async getQuizzes(
    pagination: PaginationOptions = {},
    sort: SortOptions = {},
    search?: string,
  ): Promise<{ quizzes: Quiz[]; total: number }> {
    return this.quizzesRepository.getQuizzes(pagination, sort, search);
  }

  async getQuizById(id: string): Promise<QuizWithRelations | null> {
    return this.quizzesRepository.getQuizById(id);
  }

  async deleteQuiz(id: string): Promise<void> {
    await this.quizzesRepository.deleteQuiz(id);
  }

  async createQuiz(dto: CreateQuizDto): Promise<string> {
    try {
      const payload = {
        title: dto.title,
        passingScore: dto.passingScore ?? undefined,
        questions: dto.questions.map((q) => ({
          type: q.type,
          questionText: q.questionText,
          options:
            q.options?.map((o) => ({
              text: o.text,
              isCorrect: !!o.isCorrect,
            })) ?? [],
        })),
      };

      const quizId = await this.quizzesRepository.createQuiz(payload);
      return quizId;
    } catch (error) {
      console.error('Service error:', error);
      throw new InternalServerErrorException(
        'Failed to create quiz: ' + error.message,
      );
    }
  }

  async updateQuizWithQuestions(
    id: string,
    dto: UpdateQuizDto,
  ): Promise<QuizWithRelations> {
    try {
      const payload = {
        title: dto.title,
        passingScore: dto.passingScore ?? undefined,
        questions: dto.questions.map((q) => ({
          type: q.type,
          questionText: q.questionText,
          options:
            q.options?.map((o) => ({
              text: o.text,
              isCorrect: !!o.isCorrect,
            })) ?? [],
        })),
      };

      await this.quizzesRepository.updateQuizWithQuestions(id, payload);

      const updatedQuiz = await this.getQuizById(id);
      if (!updatedQuiz) {
        throw new InternalServerErrorException('Updated quiz not found');
      }

      return updatedQuiz;
    } catch (error) {
      console.error('Service error:', error);
      throw new InternalServerErrorException(
        'Failed to update quiz: ' + error.message,
      );
    }
  }
}
