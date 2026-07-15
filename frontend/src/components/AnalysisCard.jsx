import SectionCard from './SectionCard';

const AnalysisCard = ({ summary, practiceTask }) => (
  <SectionCard>
    <h2 className="text-lg font-bold">Analysis summary</h2>
    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{summary}</p>
    {practiceTask && <div className="mt-5 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-500/10"><p className="font-semibold text-indigo-800 dark:text-indigo-200">Practice: {practiceTask.title}</p><p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">{practiceTask.description}</p></div>}
  </SectionCard>
);

export default AnalysisCard;
