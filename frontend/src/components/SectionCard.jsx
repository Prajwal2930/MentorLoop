import { motion, useReducedMotion } from 'framer-motion';

const SectionCard = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -2, boxShadow: '0 18px 40px rgba(15, 23, 42, 0.09)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={`app-surface rounded-2xl p-5 sm:p-6 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionCard;
