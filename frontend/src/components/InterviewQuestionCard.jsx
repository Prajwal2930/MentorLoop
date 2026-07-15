import SectionCard from './SectionCard';

const InterviewQuestionCard = ({ questions = [] }) => (
  <SectionCard>
    <h2 className="text-lg font-bold">Interview questions</h2>
    <div className="mt-4 space-y-4">{questions.map((item, index) => <details key={`${item.question}-${index}`} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.answer}</p></details>)}</div>
  </SectionCard>
);

export default InterviewQuestionCard;
