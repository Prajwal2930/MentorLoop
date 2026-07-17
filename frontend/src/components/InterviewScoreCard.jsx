import SectionCard from './SectionCard';

const toneClasses = {
  indigo: { text: 'text-indigo-600 dark:text-indigo-400', bar: 'bg-indigo-600' },
  emerald: { text: 'text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-600' },
  violet: { text: 'text-violet-600 dark:text-violet-400', bar: 'bg-violet-600' },
};

const InterviewScoreCard = ({ label, score, tone = 'indigo' }) => {
  const classes = toneClasses[tone] || toneClasses.indigo;
  return (
    <SectionCard><p className="text-sm font-medium text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${classes.text}`}>{score}%</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className={`h-full rounded-full ${classes.bar}`} style={{ width: `${score}%` }} /></div></SectionCard>
  );
};


export default InterviewScoreCard;
