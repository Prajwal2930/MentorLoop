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

/** Build a bounded project-review prompt from compact repository context only. */
const reviewProjectPrompt = (repositorySummary) => `
You are a senior engineering manager reviewing a developer's public portfolio project.
Assess only the repository context supplied below. Do not invent files, features, metrics, or implementation details.
Return ONLY valid JSON, without Markdown or code fences, using this exact schema:
{
  "score": 0,
  "strengths": [{ "title": "", "explanation": "" }],
  "weaknesses": [{ "title": "", "explanation": "" }],
  "resumeValue": "",
  "interviewQuestions": [{ "question": "", "answer": "" }],
  "improvements": [{ "title": "", "explanation": "" }]
}
Score must be an integer from 0 to 100. Include every key and use empty arrays when appropriate.
Repository context:
${JSON.stringify(repositorySummary)}
`;

module.exports = { buildCodeAnalysisPrompt, reviewProjectPrompt };
