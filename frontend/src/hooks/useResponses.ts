import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserId } from '../utils';
import { Answer } from '../types';
import { API_URL } from '../constants';

const USER_ID = getUserId();

const useResponses = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stored responses
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`${API_URL}/responses/${USER_ID}`);
        setAnswers(res.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          console.warn(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  // Update & submit after each step
  const updateFormAnswer = async (
    questionId: string,
    value: string | string[],
    position: number
  ) => {
    const updatedAnswers = [...answers];

    // Update or add the answer
    const index = updatedAnswers.findIndex(
      (answer) => answer.id === questionId
    );
    if (index !== -1) {
      updatedAnswers[index] = { position, id: questionId, answer: value };
    } else {
      updatedAnswers.push({ position, id: questionId, answer: value });
    }

    setAnswers(updatedAnswers);
  };

  const fetchNext = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/next-question`,
        { answers },
        { headers: { userid: USER_ID } }
      );
      return res.data.nextQuestions;
    } catch (error) {
      console.error('Failed to fetch next questions:', error);
      setError('Failed to load next questions.');
      return [];
    }
  };

  // Submit responses to BE
  const submitResponse = async () => {
    try {
      await axios.post(
        `${API_URL}/responses`,
        { answers },
        { headers: { userid: USER_ID } }
      );
      return true; 
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again later';
      setError(errorMessage);
      console.error('Error submitting response:', error);
    }
  };

  return {
    answers,
    updateFormAnswer,
    submitResponse,
    fetchNext,
    loading,
    error,
  };
};

export default useResponses;
