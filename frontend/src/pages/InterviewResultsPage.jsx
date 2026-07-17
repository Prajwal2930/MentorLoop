import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InterviewFeedbackCard from '../components/InterviewFeedbackCard';
import InterviewScoreCard from '../components/InterviewScoreCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getInterviewById } from '../services/interviewService';

const InterviewResultsPage = () => {
  const { id } = useParams(); const [interview, setInterview] = useState(null); const [error, setError] = useState('');
  useEffect(() => { getInterviewById(id).then(({ interview: item }) => setInterview(item)).catch((e) => setError(e.response?.data?.message || 'Unable to load results.')); }, [id]);
  if (!interview) return error ? <p className="text-red-600">{error}</p> : <LoadingSpinner label="Loading interview results..." />;
  const feedback = interview.aiFeedback || {};
  return <div className="mx-auto max-w-5xl space-y-6"><div><p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Interview results</p><h1 className="mt-1 text-3xl font-bold">{interview.targetRole} · {interview.interviewType}</h1></div><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><InterviewScoreCard label="Overall" score={interview.overallScore || 0} /><InterviewScoreCard label="Communication" score={interview.communicationScore || 0} tone="emerald" /><InterviewScoreCard label="Technical" score={interview.technicalScore || 0} tone="violet" /><InterviewScoreCard label="Confidence" score={interview.confidenceScore || 0} /></section><div className="grid gap-5 lg:grid-cols-2"><InterviewFeedbackCard title="Strengths" items={feedback.strengths} /><InterviewFeedbackCard title="Weaknesses" items={feedback.weaknesses} /></div><InterviewFeedbackCard title="Missing points" items={feedback.missingPoints} /><InterviewFeedbackCard title="Improvement suggestions" items={interview.improvementSuggestions} /><InterviewFeedbackCard title="Follow-up questions" items={feedback.followUpQuestions} /></div>;
};

export default InterviewResultsPage;
