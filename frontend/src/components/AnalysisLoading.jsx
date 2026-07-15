const AnalysisLoading = () => (
  <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-500/30 dark:bg-indigo-500/10">
    <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
    <h2 className="mt-4 font-bold text-indigo-900 dark:text-indigo-100">Analyzing your code</h2>
    <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">Reviewing correctness, patterns, concepts, and interview readiness.</p>
  </div>
);

export default AnalysisLoading;
