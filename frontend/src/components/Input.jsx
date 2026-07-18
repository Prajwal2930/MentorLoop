import { motion } from 'framer-motion';

const Input = ({ id, label, error, className = '', ...props }) => (
  <motion.div animate={error ? { x: [0, -4, 4, -3, 0] } : { x: 0 }} transition={{ duration: 0.28 }} className="space-y-2">
    {label && (
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`block w-full rounded-xl border bg-white/90 px-3.5 py-3 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.03)] outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:ring-4 dark:bg-slate-950/80 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 ${
        error
          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15 dark:border-red-500'
          : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/15 dark:border-slate-700 dark:focus:border-indigo-400'
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
  </motion.div>
);

export default Input;
