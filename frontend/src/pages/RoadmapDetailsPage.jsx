import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import RoadmapProgressCard from '../components/RoadmapProgressCard';
import RoadmapWeekCard from '../components/RoadmapWeekCard';
import { getRoadmapById, updateRoadmapWeek } from '../services/roadmapService';
import { celebrate } from '../utils/celebrate';

const RoadmapDetailsPage = () => {
  const { id } = useParams(); const [roadmap, setRoadmap] = useState(null); const [savingWeekId, setSavingWeekId] = useState(null); const [error, setError] = useState('');
  useEffect(() => { getRoadmapById(id).then(({ roadmap: loadedRoadmap }) => setRoadmap(loadedRoadmap)).catch((e) => setError(e.response?.data?.message || 'Unable to load roadmap.')); }, [id]);
  const updateWeek = async (weekId, completed) => { setSavingWeekId(weekId); setError(''); try { const { roadmap: updatedRoadmap } = await updateRoadmapWeek(weekId, completed); setRoadmap(updatedRoadmap); if (updatedRoadmap.weeks.every((week) => week.completed)) celebrate(); } catch (e) { setError(e.response?.data?.message || 'Unable to update roadmap progress.'); } finally { setSavingWeekId(null); } };
  if (!roadmap) return error ? <p className="text-red-600">{error}</p> : <LoadingSpinner label="Loading roadmap details..." />;
  const currentWeek = roadmap.weeks.find((week) => !week.completed);
  return <div className="mx-auto max-w-5xl space-y-6"><div><p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{roadmap.targetRole} roadmap</p><h1 className="mt-1 text-3xl font-bold">{roadmap.title}</h1><p className="mt-2 text-slate-600 dark:text-slate-300">{roadmap.careerGoal}</p></div>{error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<RoadmapProgressCard progress={roadmap.progress} estimatedDuration={roadmap.estimatedDuration} currentWeek={currentWeek} /><div className="space-y-4">{roadmap.weeks.map((week) => <RoadmapWeekCard key={week._id} week={week} onCompletionChange={updateWeek} isSaving={savingWeekId === week._id} />)}</div></div>;
};

export default RoadmapDetailsPage;
