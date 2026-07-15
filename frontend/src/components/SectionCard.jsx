const SectionCard = ({ children, className = '' }) => (
  <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 ${className}`}>
    {children}
  </section>
);

export default SectionCard;
