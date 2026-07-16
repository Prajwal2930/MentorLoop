import SectionCard from './SectionCard';

const RoadmapProgressCard = ({ progress, estimatedDuration, currentWeek }) => (
  <SectionCard>
    <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-slate-500">Overall progress</p><p className="mt-1 text-3xl font-bold text-indigo-600 dark:text-indigo-400">{progress}%</p></div><p className="text-sm text-slate-500">{estimatedDuration}</p></div>
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-indigo-600" style={{ width: `${progress}%` }} /></div>
    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{currentWeek ? `Current focus: Week ${currentWeek.weekNumber} — ${currentWeek.title}` : 'All roadmap weeks are complete.'}</p>
  </SectionCard>
);

export default RoadmapProgressCard;
