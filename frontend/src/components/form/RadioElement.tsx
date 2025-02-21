import { FC } from 'react';
import { Question } from '../../types';
import '../../App.css';

interface RadioQuestionProps {
  question: Question;
  answer: string;
  position: number;
  onChange: (questionId: string, value: string, position: number) => void;
}

const RadioQuestion: FC<RadioQuestionProps> = ({
  question,
  answer,
  position,
  onChange,
}) => {
  return (
    <fieldset className='radio-group'>
      <legend className='question-text'>{question.question}</legend>
      {question.options?.map((option) => (
        <label key={option} className='radio-label'>
          <input
            type='radio'
            name={question.id}
            value={option}
            checked={answer === option}
            onChange={() => onChange(question.id, option, position)}
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioQuestion;
