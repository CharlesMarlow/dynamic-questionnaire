import { Request, Response } from 'express';
import db from '../db/db.js';
import { schema } from '../schema.js';

export const saveResponses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    // Ensure user entry exists in DB
    db.data.responses[userId] ||= [];
    db.data.responses[userId] = [...answers];

    await db.write();
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserResponses = (req: Request, res: Response) => {
  const { userId } = req.params;
  const responses = db.data.responses[userId];

  if (!responses) {
    return res
      .status(404)
      .json({ message: 'No responses found for this user' });
  }

  res.json(responses);
};

export const getNextQuestions = (req: Request, res: Response) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Answers array is required.' });
  }

  try {
    const nextQuestions = schema.questions.filter((question) => {
      if (!question.dependsOn) return true;

      const parentAnswer = answers.find(
        (a) => a.id === question?.dependsOn?.questionId
      );

      return parentAnswer?.answer === question.dependsOn.value;
    });

    const answeredIds = answers.map((a) => a.id);
    const filteredQuestions = nextQuestions.filter(
      (q) => !answeredIds.includes(q.id)
    );

    res.json({ nextQuestions: filteredQuestions });
  } catch (error) {
    console.error('Error fetching next questions:', error);
    res.status(500).json({ message: 'Failed to fetch next question.' });
  }
};
