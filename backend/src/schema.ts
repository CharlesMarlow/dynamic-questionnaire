import { Schema } from './types.js';

export const schema: Schema = {
  title: 'User Preferences Survey',
  questions: [
    { id: 'q1', type: 'text', question: 'What is your name?', position: 1 },
    {
      id: 'q2',
      position: 2,
      type: 'radio',
      question: 'Do you like programming?',
      options: ['Yes', 'No'],
    },
    {
      id: 'info1',
      position: 3,
      type: 'info',
      question: 'Programming can be a great career choice! Keep going!',
      dependsOn: { questionId: 'q2', value: 'Yes' },
    },
    {
      id: 'q3',
      position: 4,
      type: 'text',
      question: 'What is your favorite language?',
      dependsOn: { questionId: 'q2', value: 'Yes' },
    },
    {
      id: 'q4',
      position: 5,
      type: 'multiselect',
      question: 'What frameworks have you used?',
      options: ['React', 'Vue', 'Angular', 'Svelte'],
      dependsOn: { questionId: 'q2', value: 'Yes' },
    },
    {
      id: 'outro',
      position: 6,
      type: 'info',
      question:
        'Thank you for completing the survey! Please press submit for confirmation',
    },
  ],
};
