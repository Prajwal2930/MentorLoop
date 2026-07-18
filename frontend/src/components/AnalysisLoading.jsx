import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const steps = ['Parsing code...', 'Detecting issues...', 'Generating suggestions...', 'Finalizing report...'];

const AnalysisLoading = ({ title = 'Analyzing your code...' }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveStep((current) => (current + 1) % steps.length), 1300);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 25 }} className="app-surface overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"><Sparkles className="h-5 w-5" /></div>
        <div><p className="quiet-label">AI at work</p><h2 className="mt-1 font-bold">{title}</h2><p className="text-sm text-slate-500 dark:text-slate-400">Your AI mentor is reviewing the details.</p></div>
      </div>
      <div className="mt-7 space-y-3">
        {steps.map((step, index) => (
          <motion.div key={step} animate={{ opacity: index <= activeStep ? 1 : 0.36, x: index === activeStep ? 4 : 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-3 text-sm">
            <span className={`grid h-5 w-5 place-items-center rounded-full ${index < activeStep ? 'bg-emerald-500 text-white' : index === activeStep ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-[10px] font-bold text-slate-400 dark:bg-slate-800'}`}>
              {index < activeStep ? <Check className="h-3 w-3" strokeWidth={3} /> : index + 1}
            </span>
            <span className={index === activeStep ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>{step}{index === activeStep && <span className="ml-1 inline-flex gap-0.5"><i className="h-1 w-1 animate-bounce rounded-full bg-indigo-500" /><i className="h-1 w-1 animate-bounce rounded-full bg-indigo-500 [animation-delay:120ms]" /><i className="h-1 w-1 animate-bounce rounded-full bg-indigo-500 [animation-delay:240ms]" /></span>}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnalysisLoading;
