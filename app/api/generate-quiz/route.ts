import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import dbConnect from '../../../lib/mongodb';
import Quiz from '../../../lib/models/Quiz';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory rate limiting (resets on server restart)
let requestCount = 0;
const MAX_REQUESTS = 10; // per server instance

export async function POST(request: NextRequest) {
  if (requestCount >= MAX_REQUESTS) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
  }

  requestCount++;

  try {
    await dbConnect();

    const { topic, difficulty, count } = await request.json();

    if (!topic || !difficulty || !count) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return NextResponse.json({ error: 'Invalid difficulty' }, { status: 400 });
    }

    if (count < 1 || count > 20) {
      return NextResponse.json({ error: 'Count must be between 1 and 20' }, { status: 400 });
    }

    const prompt = `Generate ${count} multiple-choice questions about ${topic} at ${difficulty} difficulty level.

Each question must have:
- A clear question
- Exactly 4 options (A, B, C, D)
- The correct answer as a string (not index)
- A brief explanation

Format the response as valid JSON:
{
  "questions": [
    {
      "question": "string",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "answer": "A) option1",
      "explanation": "string"
    }
  ]
}

Ensure the questions are educational and accurate.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a quiz generator. Always respond with valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', responseText);
      return NextResponse.json({ error: 'Invalid response format from AI' }, { status: 500 });
    }

    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      return NextResponse.json({ error: 'Invalid questions format' }, { status: 500 });
    }

    // Validate each question
    const validatedQuestions = parsedResponse.questions.map((q: any) => {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.answer || !q.explanation) {
        throw new Error('Invalid question structure');
      }
      return {
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
      };
    });

    // Save to database
    const quiz = new Quiz({
      topic,
      difficulty,
      questions: validatedQuestions,
    });

    await quiz.save();

    return NextResponse.json({ quizId: quiz._id, questions: validatedQuestions });
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}