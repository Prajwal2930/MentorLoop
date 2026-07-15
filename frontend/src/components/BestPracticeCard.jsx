import SectionCard from './SectionCard';

const BestPracticeCard = ({ practices = [] }) => (
  <SectionCard>
    <h2 className="text-lg font-bold">Best practices</h2>
    <div className="mt-4 space-y-3">{practices.map((practice, index) => <div key={`${practice.title}-${index}`} className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-500/10"><p className="font-semibold text-emerald-800 dark:text-emerald-200">{practice.title}</p><p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">{practice.explanation}</p></div>)}</div>
  </SectionCard>
);

export default BestPracticeCard;
