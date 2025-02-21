import { FC } from 'react';
import { Question } from '../../types';
import '../../App.css';

interface MultiselectQuestionProps {
  question: Question;
  answer: string[];
  position: number;
  onChange: (questionId: string, value: string[], position: number) => void;
}

const MultiselectQuestion: FC<MultiselectQuestionProps> = ({
  question,
  answer,
  position,
  onChange,
}) => {
  return (
    <fieldset className='checkbox-group'>
      <legend className='question-text'>{question.question}</legend>
      {question.options?.map((option) => (
        <label key={option} className='checkbox-label'>
          <input
            type='checkbox'
            value={option}
            checked={Array.isArray(answer) && answer.includes(option)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...(Array.isArray(answer) ? answer : []), option]
                : (answer || []).filter((a) => a !== option);
              onChange(question.id, newValue, position);
            }}
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
};

export default MultiselectQuestion;
