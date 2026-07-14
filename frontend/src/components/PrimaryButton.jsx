const PrimaryButton = ({ children, className = '', isLoading = false, disabled = false, ...props }) => (
  <button
    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950 ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
    )}
    {children}
  </button>
);

export default PrimaryButton;
