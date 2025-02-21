import { FC } from 'react';
import { Question } from '../types';
import TextQuestion from './form/TextElement';
import RadioQuestion from './form/RadioElement';
import MultiselectQuestion from './form/MultiSelectElement';
import InfoScreen from './form/InfoElement';
import '../App.css';

interface QuestionCardProps {
  question: Question;
  answer: string | string[];
  position: number;
  onChange: (
    questionId: string,
    value: string | string[],
    position: number
  ) => void;
}

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  answer,
  position,
  onChange,
}) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'text':
        return (
          <TextQuestion
            question={question}
            answer={answer as string}
            onChange={onChange}
            position={position}
          />
        );
      case 'radio':
        return (
          <RadioQuestion
            question={question}
            answer={answer as string}
            onChange={onChange}
            position={position}
          />
        );
      case 'multiselect':
        return (
          <MultiselectQuestion
            question={question}
            answer={answer as string[]}
            onChange={onChange}
            position={position}
          />
        );
      case 'info':
        return <InfoScreen question={question} />;
      default:
        return null;
    }
  };

  return (
    <div className='question-card' aria-live='polite'>
      {renderQuestion()}
    </div>
  );
};

export default QuestionCard;
