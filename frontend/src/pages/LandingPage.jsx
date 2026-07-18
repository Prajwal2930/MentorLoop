import { ArrowRight, BrainCircuit, Code2, GitFork, Sparkles, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const features = [
  { icon: Target, title: 'Know where you stand', text: 'Profile, skills, and career readiness in one focused workspace.' },
  { icon: Code2, title: 'Learn from your code', text: 'Get structured AI feedback, practice tasks, and interview questions.' },
  { icon: GitFork, title: 'Strengthen your portfolio', text: 'Turn public projects into clear resume evidence and improvements.' },
  { icon: BrainCircuit, title: 'Practice with intent', text: 'Use mock interviews and analytics to build interview confidence.' },
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const primaryPath = isAuthenticated ? '/dashboard' : '/register';

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f7f4] text-slate-950 dark:bg-[#111214] dark:text-white">
      <Navbar />
      <main>
        <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
          <div className="absolute left-1/2 top-0 -z-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
          <div className="relative grid gap-14 lg:grid-cols-[1.06fr_.94fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-indigo-700 shadow-sm dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300"><Sparkles className="h-3.5 w-3.5" />Developer growth, made deliberate</p>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-[-.045em] sm:text-6xl">Your career is not a checklist. <span className="text-indigo-600 dark:text-indigo-400">It is a practice.</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">MentorLoop brings your skills, projects, code feedback, interview practice, and learning plan into one calm developer studio.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={primaryPath} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">{isAuthenticated ? 'Open workspace' : 'Build your workspace'}<ArrowRight className="h-4 w-4" /></Link>
                {!isAuthenticated && <Link to="/login" className="rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Sign in</Link>}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-950/[.08] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-slate-800"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400">Today in MentorLoop</p><p className="mt-1 font-semibold">Build a stronger developer story</p></div><span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(34,197,94,.12)]" /></div>
              <div className="mt-5 space-y-3">{[['Career snapshot', 'Your skills, profile, and readiness'], ['AI Code Analyzer', 'Find gaps and practice what matters'], ['Project Review', 'Make your GitHub work portfolio-ready'], ['Learning Roadmap', 'Know the next best step']].map(([title, text], index) => <div key={title} className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-600 text-xs font-bold text-white">0{index + 1}</span><div><p className="text-sm font-bold">{title}</p><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{text}</p></div></div>)}</div>
            </motion.div>
          </div>
        </section>
        <section className="border-y border-slate-200/80 bg-white/50 py-16 dark:border-slate-800 dark:bg-slate-900/30"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-600 dark:text-indigo-400">One connected loop</p><h2 className="mt-3 text-3xl font-bold tracking-tight">From first skill to confident interview.</h2></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, title, text }) => <motion.article whileHover={{ y: -4 }} key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"><Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></motion.article>)}</div><div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-7 dark:border-slate-800"><p className="text-sm text-slate-500">Built for students and early-career developers who want focused progress.</p><Link to={primaryPath} className="hidden items-center gap-2 text-sm font-bold text-indigo-600 sm:inline-flex dark:text-indigo-400">Start your loop <ArrowRight className="h-4 w-4" /></Link></div></div></section>
      </main>
      <footer className="pb-6 text-center font-bold text-sm text-slate-500 dark:text-slate-400">Made with <span aria-label="love" role="img">&#10084;&#65039;</span> by <a href="https://github.com/omkadu8767" target="_blank" rel="noreferrer" className="font-bold  text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400">OK</a></footer>
    </div>
  );
};

export default LandingPage;
