export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Advanced';

export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ShortQuestion {
  id: number;
  question: string;
  sampleAnswer: string;
  explanation: string;
}

export interface QuizData {
  id: string;
  createdAt: string;
  subject: string;
  topic: string;
  difficulty: DifficultyLevel;
  multipleChoiceQuestions: MultipleChoiceQuestion[];
  shortQuestions: ShortQuestion[];
}
