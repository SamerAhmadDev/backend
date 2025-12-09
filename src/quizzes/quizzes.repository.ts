import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationOptions, SortOptions } from 'src/common/interfaces';
import { SupabaseService } from '../supabase/supabase.service';
import { Quiz, QuizWithRelations } from './entities/quizzes.entity';

@Injectable()
export class QuizzesRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async getQuizzes(
    pagination: PaginationOptions = {},
    sort?: SortOptions,
    search?: string,
  ): Promise<{ quizzes: Quiz[]; total: number }> {
    let query = this.supabase.client
      .from('quizzes')
      .select('*', { count: 'exact' });

    // Apply search
    if (search) {
      const searchPattern = `%${search}%`;
      query = query.or(`title.ilike.${searchPattern}`);
    }

    // Apply sorting (only allow specific fields)
    const allowedSortFields = ['title', 'created_at'];
    if (sort?.sortBy && allowedSortFields.includes(sort.sortBy)) {
      const direction = sort.sortDirection === 'desc' ? false : true;
      query = query.order(sort.sortBy, { ascending: direction });
    }

    // Apply pagination
    if (pagination.limit !== undefined) query = query.limit(pagination.limit);
    if (pagination.offset !== undefined)
      query = query.range(
        pagination.offset,
        pagination.offset + (pagination.limit ?? 0) - 1,
      );

    const { data, error, count } = await query;

    if (error) throw new InternalServerErrorException(error.message);

    return { quizzes: data as Quiz[], total: count ?? 0 };
  }

  async getQuizById(id: string): Promise<QuizWithRelations | null> {
    const { data, error } = await this.supabase.client
      .from('quizzes')
      .select(
        `
      *,
      questions:quiz_questions (
        *,
        options:quiz_question_options (*)
      )
    `,
      )
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (data) {
      data.questions.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    return data as QuizWithRelations | null;
  }

  async deleteQuiz(id: string): Promise<void> {
    const { error: dbError } = await this.supabase.client
      .from('quizzes')
      .delete()
      .eq('id', id);

    if (dbError) throw new InternalServerErrorException(dbError.message);
  }

  async createQuiz(payload: {
    title: string;
    passingScore?: number;
    questions: {
      type: 'mcq' | 'true_false';
      questionText: string;
      order: number;
      options?: { text: string; isCorrect: boolean }[];
    }[];
  }): Promise<string> {
    const { data, error } = await this.supabase.client.rpc('create_full_quiz', {
      payload,
    });

    if (error) {
      console.error('RPC error (create):', error);
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async updateQuizWithQuestions(
    id: string,
    payload: {
      title: string;
      passingScore?: number;
      questions: {
        type: 'mcq' | 'true_false';
        questionText: string;
        order: number;
        options?: { text: string; isCorrect: boolean }[];
      }[];
    },
  ): Promise<void> {
    const { error } = await this.supabase.client.rpc('update_full_quiz', {
      p_quiz_id: id,
      payload,
    });

    if (error) {
      console.error('RPC error (update):', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
