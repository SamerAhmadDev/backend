import { Tables } from 'src/supabase/types';

export type StudentQuizAttempt = Tables<'student_quiz_attempts'>;
export type StudentQuizAttemptQuestion =
  Tables<'student_quiz_attempt_questions'>;

export type StudentQuizAnswerInput = {
  question_id: string;
  selected_option_ids: string[];
};

export type StudentQuizAttemptOutput = {
  attempt_id: string;
  feedback: {
    question_id: string;
    result: 'correct' | 'incorrect';
    options: {
      option_id: string;
      text: string;
      selected: boolean;
      status: 'correct' | 'incorrect';
    }[];
  }[];
};

export type LatestQuizAttemptRow = {
  quiz_id: string;
  attempt: StudentQuizAttemptOutput;
};
