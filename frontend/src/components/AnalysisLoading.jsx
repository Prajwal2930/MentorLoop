import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const steps = ['Parsing code...', 'Detecting issues...', 'Generating suggestions...', 'Finalizing report...'];

const AnalysisLoading = ({ title = 'Analyzing your code...' }) => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => { const timer = setInterval(() => setActiveStep((current) => (current + 1) % steps.length), 1300); return () => clearInterval(timer); }, []);
  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-2xl border border-indigo-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-indigo-500/25 dark:bg-slate-900/80 sm:p-8"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"><Sparkles className="h-5 w-5" /></div><div><h2 className="font-bold">{title}</h2><p className="text-sm text-slate-500 dark:text-slate-400">Your AI mentor is reviewing the details.</p></div></div><div className="mt-7 space-y-3">{steps.map((step, index) => <motion.div key={step} animate={{ opacity: index <= activeStep ? 1 : 0.36, x: index === activeStep ? 4 : 0 }} className="flex items-center gap-3 text-sm"><span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${index < activeStep ? 'bg-emerald-500 text-white' : index === activeStep ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>{index < activeStep ? '✓' : index + 1}</span><span className={index === activeStep ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>{step}{index === activeStep && <span className="ml-1 inline-flex gap-0.5"><i className="h-1 w-1 animate-bounce rounded-full bg-indigo-500" /><i className="h-1 w-1 animate-bounce rounded-full bg-indigo-500 [animation-delay:120ms]" /><i className="h-1 w-1 animate-bounce rounded-full bg-indigo-500 [animation-delay:240ms]" /></span>}</span></motion.div>)}</div></motion.div>;
};

export default AnalysisLoading;
