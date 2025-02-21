import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import useResponses from './hooks/useResponses';
import useSchema from './hooks/useSchema';
import ProgressBar from './components/ProgressBar';
import NavigationButtons from './components/NavigationButtons';
import QuestionCard from './components/QuestionCard';
import { notifyInteractionSuccess } from './utils';
import './App.css';

function App() {
  const { schema, schemaError } = useSchema();
  const {
    answers,
    updateFormAnswer,
    submitResponse,
    fetchNext,
    loading,
    error,
  } = useResponses();
  const [currentIndex, setCurrentIndex] = useState(0);
  const getVisibleQuestions = () => {
    if (!schema) return [];
    return schema.questions.filter((question) => {
      if (!question.dependsOn) return true;
      const parentAnswer = answers.find(
        (a) => a.id === question?.dependsOn?.questionId
      );

      return parentAnswer?.answer === question.dependsOn.value;
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentIndex];
  const currentAnswer = answers.find(
    (answer) => answer.id === currentQuestion.id
  );
  const isCurrentQuestionAnswered =
    currentQuestion &&
    (currentQuestion.type === 'info' ||
      (currentAnswer !== undefined && currentAnswer.answer !== ''));

  const nextButtonText =
    currentIndex === getVisibleQuestions().length - 1 ? 'Submit' : 'Next';
  const isNextDisabled =
    !isCurrentQuestionAnswered || currentIndex >= visibleQuestions.length - 1;
  const isSubmitDisabled = visibleQuestions.some((q) => {
    // Consider info questions as always answered
    if (q.type === 'info') return false;
    return answers.find(
      (answer) => answer.id === undefined || answer.id === ''
    );
  });
  const progress =
    visibleQuestions.length > 0
      ? (currentIndex / (visibleQuestions.length - 1)) * 100
      : 0;

  const handleNext = async () => {
    if (!currentQuestion) return;

    // Update answer and refetch visible questions
    updateFormAnswer(
      currentQuestion.id,
      currentAnswer?.answer ?? '',
      currentQuestion.position
    );

    fetchNext();

    const updatedQuestions = getVisibleQuestions();
    const nextIndex = updatedQuestions.findIndex(
      (q) => q.id === currentQuestion.id
    );

    if (nextIndex !== -1 && nextIndex < updatedQuestions.length - 1) {
      setCurrentIndex(nextIndex + 1);
    } else {
      setCurrentIndex(updatedQuestions.length - 1);
    }
  };

  const handleSubmit = async () => {
    const submissionSuccess = await submitResponse();
    if (!error && submissionSuccess) {
      notifyInteractionSuccess();
    } else {
      alert('Failed to submit responses. Please try again.');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Handle schema error
  if (schemaError) {
    return (
      <h2 className='error-message'>
        An unexpected error occurred. Please try again later
      </h2>
    );
  }

  return (
    <div className='container'>
      <ToastContainer />
      {!loading && <ProgressBar progress={progress} />}
      <h1 className='title'>{schema?.title}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              position={currentQuestion.position}
              answer={currentAnswer?.answer || ''}
              onChange={updateFormAnswer}
            />
          )}
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={nextButtonText === 'Submit' ? handleSubmit : handleNext}
            isPreviousDisabled={currentIndex === 0}
            isNextDisabled={isNextDisabled}
            nextButtonText={nextButtonText}
            isSubmitDisabled={isSubmitDisabled}
          />
        </>
      )}
    </div>
  );
}

export default App;
