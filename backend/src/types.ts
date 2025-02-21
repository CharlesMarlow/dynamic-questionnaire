type UserResponses = Record<string, string | string[]>;

export type DatabaseSchema = {
  responses: Record<string, Array<UserResponses>>;
};

type QuestionType = 'text' | 'radio' | 'multiselect' | 'info';

export type Question = {
  id: string;
  position: number;
  type: QuestionType;
  question?: string;
  options?: string[];
  dependsOn?: { questionId: string; value: string };
};

export type Schema = {
  title: string;
  questions: Question[];
};
