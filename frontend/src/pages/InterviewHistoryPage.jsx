import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionCard from '../components/SectionCard';
import { getInterviewHistory } from '../services/interviewService';

const InterviewHistoryPage = () => {
  const [interviews, setInterviews] = useState(null); const [error, setError] = useState('');
  useEffect(() => { getInterviewHistory().then(({ interviews: items }) => setInterviews(items)).catch((e) => setError(e.response?.data?.message || 'Unable to load interview history.')); }, []);
  if (!interviews) return error ? <p className="text-red-600">{error}</p> : <LoadingSpinner />;
  return <div className="mx-auto max-w-4xl"><div><p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Mock interviews</p><h1 className="mt-1 text-3xl font-bold">Interview history</h1></div><div className="mt-6 space-y-3">{interviews.length ? interviews.map((interview) => <Link key={interview._id} to={`/interview/results/${interview._id}`}><SectionCard className="transition hover:border-indigo-400"><div className="flex justify-between gap-4"><div><p className="font-bold">{interview.interviewType} · {interview.targetRole}</p><p className="mt-1 text-sm text-slate-500">{new Date(interview.createdAt).toLocaleDateString()}</p></div><p className="text-2xl font-bold text-indigo-600">{interview.overallScore ?? '—'}{interview.overallScore !== null ? '%' : ''}</p></div></SectionCard></Link>) : <SectionCard><p className="text-slate-500">No interview sessions yet.</p></SectionCard>}</div></div>;
};

export default InterviewHistoryPage;
