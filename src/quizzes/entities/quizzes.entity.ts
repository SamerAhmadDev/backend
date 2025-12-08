import { Tables, TablesInsert } from 'src/supabase/types';

export type Quiz = Tables<'quizzes'>;
export type QuizQuestions = Tables<'quiz_questions'>;
export type QuizQuestionOptions = Tables<'quiz_question_options'>;
export type QuizInsert = TablesInsert<'quizzes'>;

export interface QuizWithRelations extends Quiz {
  questions:
    | (QuizQuestions & {
        options: QuizQuestionOptions[] | null;
      })[]
    | null;
}
