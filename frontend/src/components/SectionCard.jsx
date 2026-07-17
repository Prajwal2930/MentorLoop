import { motion, useReducedMotion } from 'framer-motion';

const SectionCard = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -2, boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08)' }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={`rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-950/[0.03] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/80 dark:shadow-black/20 sm:p-6 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionCard;
