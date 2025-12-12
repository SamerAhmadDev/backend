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

export interface StudentQuiz {
  id: string;
  title: string;
  passing_score: number | null;
  created_at: string;
  updated_at: string;
  questions: StudentQuizQuestion[];
}

export interface StudentQuizQuestion {
  id: string;
  quiz_id: string;
  type: string;
  order: number | null;
  question_text: string;
  created_at: string;
  updated_at: string;
  options: StudentQuizOption[];
}

export interface StudentQuizOption {
  id: string;
  quiz_question_id: string;
  text: string;
}
