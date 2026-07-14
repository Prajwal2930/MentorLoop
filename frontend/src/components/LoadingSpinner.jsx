const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center gap-3 py-8" role="status" aria-live="polite">
    <span
      className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400"
      aria-hidden="true"
    />
    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
  </div>
);

export default LoadingSpinner;
