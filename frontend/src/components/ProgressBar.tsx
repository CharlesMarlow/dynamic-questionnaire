import { FC } from 'react';
import '../App.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className='progress-bar'>
      <div
        className='progress-bar-fill'
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
