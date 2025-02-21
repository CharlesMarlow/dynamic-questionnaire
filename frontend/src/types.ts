type QuestionType = 'text' | 'radio' | 'multiselect' | 'info';

export type Question = {
  id: string;
  type: QuestionType;
  position: number;
  question?: string;
  options?: string[];
  dependsOn?: { questionId: string; value: string };
};

export type Schema = {
  title: string;
  questions: Question[];
};

export type Answers = Record<string, Answer[]>;

export type Answer = {
  position: number;
  id: string;
  answer: string | string[];
}
