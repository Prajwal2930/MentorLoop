const { GoogleGenAI } = require('@google/genai');
const AppError = require('../../utils/AppError');

const parseJsonResponse = (text) => {
  const normalizedText = text.trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '');

  try {
    return JSON.parse(normalizedText);
  } catch {
    throw new AppError('The AI provider returned an invalid analysis response.', 502);
  }
};

const generateStructuredContent = async (prompt) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new AppError('Gemini is not configured on this server.', 503);
  }

  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await client.models.generateContent({
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });

  return parseJsonResponse(response.text || '');
};

module.exports = { generateStructuredContent };
