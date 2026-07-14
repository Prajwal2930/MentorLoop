const Input = ({ id, label, error, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500'
          : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700 dark:focus:border-indigo-400'
      } ${className}`}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="text-xs font-medium text-red-600 dark:text-red-400">
        {error}
      </p>
    )}
  </div>
);

export default Input;
