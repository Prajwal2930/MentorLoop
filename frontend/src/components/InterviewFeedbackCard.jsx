import SectionCard from './SectionCard';

const InterviewFeedbackCard = ({ title, items = [] }) => <SectionCard><h2 className="text-lg font-bold">{title}</h2><div className="mt-4 space-y-3">{items.length ? items.map((item, index) => <div key={`${item.title || item.question}-${index}`} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800"><p className="font-semibold">{item.title || item.question}</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.explanation || item.answer}</p></div>) : <p className="text-sm text-slate-500">No feedback returned.</p>}</div></SectionCard>;

export default InterviewFeedbackCard;
