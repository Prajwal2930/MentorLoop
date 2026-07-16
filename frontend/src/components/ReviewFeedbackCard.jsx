import SectionCard from './SectionCard';

const toneClasses = {
  emerald: 'bg-emerald-50 dark:bg-emerald-500/10',
  red: 'bg-red-50 dark:bg-red-500/10',
  indigo: 'bg-indigo-50 dark:bg-indigo-500/10',
};

const ReviewFeedbackCard = ({ title, items = [], tone = 'indigo' }) => (
  <SectionCard>
    <h2 className="text-lg font-bold">{title}</h2>
    <div className="mt-4 space-y-3">{items.length ? items.map((item, index) => <div key={`${item.title}-${index}`} className={`rounded-lg p-4 ${toneClasses[tone] || toneClasses.indigo}`}><p className="font-semibold">{item.title}</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.explanation}</p></div>) : <p className="text-sm text-slate-500">No items returned.</p>}</div>
  </SectionCard>
);

export default ReviewFeedbackCard;
