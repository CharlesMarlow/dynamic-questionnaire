import { FC } from 'react';
import { Question } from '../../types';
import '../../App.css';

interface InfoScreenProps {
  question: Question;
}

const InfoScreen: FC<InfoScreenProps> = ({ question }) => {
  return (
    <div className='info-message'>
      <p>{question.question}</p>
    </div>
  );
};

export default InfoScreen;
