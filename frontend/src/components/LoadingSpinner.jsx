import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ label = 'Loading...' }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-32 flex-col items-center justify-center gap-3 py-8" role="status" aria-live="polite">
    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20"><LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /></div>
    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
  </motion.div>
);

export default LoadingSpinner;
