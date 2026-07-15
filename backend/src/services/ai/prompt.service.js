/** Build the only prompt used for code-analysis generation. */
const buildCodeAnalysisPrompt = ({ language, code }) => `
You are a precise senior software engineer mentoring a developer.
Analyze the following ${language} code. Focus on correctness, security, performance, readability, and interview readiness.

Return ONLY valid JSON. Do not use Markdown, prose outside JSON, or code fences.
Use this exact schema:
{
  "summary": "concise overall assessment",
  "errors": [{ "title": "short title", "explanation": "actionable explanation", "severity": "low|medium|high" }],
  "bestPractices": [{ "title": "short title", "explanation": "specific improvement" }],
  "concepts": [{ "name": "concept", "explanation": "why it matters in this code" }],
  "interviewQuestions": [{ "question": "question", "answer": "concise expected answer" }],
  "practiceTask": { "title": "task title", "description": "small practical next exercise" }
}
Always include every key. Use empty arrays where there are no findings.

Code to analyze:
\`\`\`${language}
${code}
\`\`\`
`;

module.exports = { buildCodeAnalysisPrompt };
