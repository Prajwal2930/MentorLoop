import { useState } from 'react';
import SectionCard from './SectionCard';

const RoadmapWeekCard = ({ week, onCompletionChange, isSaving }) => {
  const [expanded, setExpanded] = useState(!week.completed);
  return <SectionCard className={week.completed ? 'opacity-75' : ''}><div className="flex items-start justify-between gap-4"><button type="button" onClick={() => setExpanded((value) => !value)} className="text-left"><p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Week {week.weekNumber}</p><h2 className={`mt-1 text-lg font-bold ${week.completed ? 'line-through' : ''}`}>{week.title}</h2></button><label className="flex shrink-0 items-center gap-2 text-sm font-medium"><input type="checkbox" checked={week.completed} disabled={isSaving} onChange={(event) => onCompletionChange(week._id, event.target.checked)} className="h-4 w-4 accent-indigo-600" />Done</label></div>{expanded && <div className="mt-5 grid gap-5 md:grid-cols-3"><div><h3 className="text-sm font-bold">Topics</h3><ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">{week.topics.map((topic) => <li key={topic}>• {topic}</li>)}</ul></div><div><h3 className="text-sm font-bold">Mini projects</h3><ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">{week.miniProjects.map((project) => <li key={project}>• {project}</li>)}</ul></div><div><h3 className="text-sm font-bold">Resources</h3><ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">{week.resources.map((resource) => <li key={resource}>• {resource}</li>)}</ul></div></div>}</SectionCard>;
};

export default RoadmapWeekCard;
