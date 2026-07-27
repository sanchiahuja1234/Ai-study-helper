import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { subject, topic, difficulty } = req.body;

    if (!subject || !topic || !difficulty) {
      return res.status(400).json({
        success: false,
        error: 'Please provide Subject, Topic, and Difficulty.',
      });
    }

    const ai = getGenAIClient();

    const prompt = `You are an expert academic tutor and quiz generator.
Generate a comprehensive high-quality study quiz for a student based on the following details:
- Subject: ${subject}
- Topic: ${topic}
-
