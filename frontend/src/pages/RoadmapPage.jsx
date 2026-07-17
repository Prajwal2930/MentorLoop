import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PrimaryButton from '../components/PrimaryButton';
import RoadmapProgressCard from '../components/RoadmapProgressCard';
import SectionCard from '../components/SectionCard';
import { generateRoadmap, getCurrentRoadmap } from '../services/roadmapService';
import { celebrate } from '../utils/celebrate';

const RoadmapPage = () => {
  const navigate = useNavigate(); const [roadmap, setRoadmap] = useState(null); const [loading, setLoading] = useState(true); const [generating, setGenerating] = useState(false); const [error, setError] = useState('');
  useEffect(() => { getCurrentRoadmap().then(({ roadmap: current }) => setRoadmap(current)).catch((e) => setError(e.response?.data?.message || 'Unable to load roadmap.')).finally(() => setLoading(false)); }, []);
  const create = async () => { setGenerating(true); setError(''); try { const { roadmap: generated } = await generateRoadmap(); celebrate(); navigate(`/roadmap/${generated._id}`); } catch (e) { setError(e.response?.data?.message || 'Unable to generate roadmap.'); } finally { setGenerating(false); } };
  if (loading) return <LoadingSpinner label="Loading your roadmap..." />;
  const currentWeek = roadmap?.weeks.find((week) => !week.completed);
  return <div className="mx-auto max-w-5xl space-y-7"><div><p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Personalized learning roadmap</p><h1 className="mt-1 text-3xl font-bold">A focused path to your next role.</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Generated from your profile, skills, portfolio feedback, and recent code analysis.</p></div>{error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{error}</p>}{roadmap ? <div className="space-y-5"><RoadmapProgressCard progress={roadmap.progress} estimatedDuration={roadmap.estimatedDuration} currentWeek={currentWeek} /><SectionCard><h2 className="text-lg font-bold">{roadmap.title}</h2><p className="mt-2 text-slate-600 dark:text-slate-300">{roadmap.careerGoal}</p><Link to={`/roadmap/${roadmap._id}`} className="mt-5 inline-block rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white">Open roadmap</Link></SectionCard></div> : <SectionCard><h2 className="text-lg font-bold">Generate your first roadmap</h2><p className="mt-2 text-slate-600 dark:text-slate-300">We will create a weekly learning plan using your current MentorLoop progress.</p><PrimaryButton className="mt-5" onClick={create} isLoading={generating}>Generate roadmap</PrimaryButton></SectionCard>}</div>;
};

export default RoadmapPage;
