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

/** Build a personalized but bounded learning-roadmap prompt. */
const roadmapPrompt = (learnerContext) => `
You are an expert developer mentor creating a practical personalized learning roadmap.
Use only the learner context below. Build an achievable plan aligned to their target role, current skills, daily learning goal, learning style, GitHub feedback, and recent code-analysis patterns.
Return ONLY valid JSON, without Markdown or code fences, using this exact schema:
{
  "title": "",
  "estimatedDuration": "",
  "careerGoal": "",
  "weeks": [
    { "weekNumber": 1, "title": "", "topics": [""], "miniProjects": [""], "resources": [""] }
  ]
}
Create 4 to 12 sequential weeks. Resources must be concise names or official URLs; do not invent certifications. Include every key.
Learner context:
${JSON.stringify(learnerContext)}
`;

module.exports = { buildCodeAnalysisPrompt, reviewProjectPrompt, roadmapPrompt };
