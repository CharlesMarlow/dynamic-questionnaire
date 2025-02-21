import { FC } from 'react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  nextButtonText: string;
  isSubmitDisabled: boolean;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  nextButtonText,
  isSubmitDisabled,
}) => {
  return (
    <nav className='button-container' aria-label='Question navigation'>
      <button
        type='button'
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        aria-disabled={isPreviousDisabled}
        className='button prev-button'
      >
        Previous
      </button>
      <button
        type='button'
        onClick={onNext}
        disabled={
          nextButtonText === 'Submit' ? isSubmitDisabled : isNextDisabled
        }
        aria-disabled={
          nextButtonText === 'Submit' ? isSubmitDisabled : isNextDisabled
        }
        className='button next-button'
      >
        {nextButtonText}
      </button>
    </nav>
  );
};

export default NavigationButtons;
