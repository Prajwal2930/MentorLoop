import { LoaderCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const PrimaryButton = ({ children, className = '', isLoading = false, disabled = false, ...props }) => {
  const prefersReducedMotion = useReducedMotion();
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled && !prefersReducedMotion ? { y: -1, boxShadow: '0 10px 24px rgba(79, 70, 229, 0.24)' } : undefined}
      whileTap={!isDisabled && !prefersReducedMotion ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55 dark:focus-visible:ring-offset-slate-950 ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
