import SectionCard from './SectionCard';

const ProjectScoreCard = ({ score, repositoryName }) => (
  <SectionCard className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 dark:border-indigo-500/30 dark:from-indigo-500/10 dark:to-violet-500/10">
    <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Project score</p>
    <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-bold text-indigo-700 dark:text-indigo-200">{score}</span><span className="mb-1 text-lg text-indigo-600 dark:text-indigo-300">/100</span></div>
    <p className="mt-3 text-sm text-indigo-700 dark:text-indigo-300">Portfolio review for {repositoryName}</p>
  </SectionCard>
);

export default ProjectScoreCard;
