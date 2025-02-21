import { FC } from 'react';
import { Question } from '../../types';
import '../../App.css'

interface TextQuestionProps {
  question: Question;
  answer: string;
  position: number;
  onChange: (questionId: string, value: string, position: number) => void;
}

const TextElement: FC<TextQuestionProps> = ({
  question,
  answer,
  position,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={question.id} className='question-text'>
        {question.question}
      </label>
      <input
        id={question.id}
        type='text'
        value={answer || ''}
        onChange={(e) => onChange(question.id, e.target.value, position)}
        className='input-field'
      />
    </div>
  );
};

export default TextElement;
