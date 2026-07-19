import SectionCard from './SectionCard';

const ErrorCard = ({ errors = [] }) => (
  <SectionCard>
    <h2 className="text-lg font-bold">Issues to address</h2>
    <div className="mt-4 space-y-3">{errors.length ? errors.map((error, index) => <div key={`${error.title}-${index}`} className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10"><div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:gap-3"><p className="break-words font-semibold text-red-800 dark:text-red-200">{error.title}</p><span className="w-fit shrink-0 text-xs font-bold uppercase text-red-600 dark:text-red-300">{error.severity}</span></div><p className="mt-1 break-words text-sm text-red-700 dark:text-red-300">{error.explanation}</p></div>) : <p className="text-sm text-slate-500">No significant issues found.</p>}</div>
  </SectionCard>
);

export default ErrorCard;
