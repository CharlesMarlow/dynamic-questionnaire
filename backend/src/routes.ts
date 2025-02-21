import express from 'express';
import { extractUserIdFromHeaders } from './middleware.js';
import {
  saveResponses,
  getUserResponses,
  getNextQuestions,
} from './controllers/responseController.js';
import { schema } from './schema.js';

const router = express.Router();

// Schema endpoint
router.get('/schema', (req, res) => res.json(schema));

// User responses endpoints
router.post('/responses', extractUserIdFromHeaders, saveResponses);
router.get('/responses/:userId', getUserResponses);

// Next question endpoint
router.post('/next-question', extractUserIdFromHeaders, getNextQuestions);

export default router;
