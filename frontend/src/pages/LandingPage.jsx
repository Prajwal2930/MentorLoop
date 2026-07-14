import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
              Your developer growth workspace
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build coding confidence, one loop at a time.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              MentorLoop helps students and early-career developers stay focused, track their progress, and build the habits behind great technical careers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
              >
                {isAuthenticated ? 'Open dashboard' : 'Start your journey'}
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">This week</p>
                <p className="mt-1 text-2xl font-bold">Your momentum</p>
              </div>
              <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                On track
              </span>
            </div>
            <div className="mt-8 space-y-5">
              {[
                ['Learning progress', '72%', 'bg-indigo-600'],
                ['Practice consistency', '84%', 'bg-violet-600'],
                ['Career readiness', '58%', 'bg-cyan-600'],
              ].map(([label, value, color]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span className="text-slate-700 dark:text-slate-200">{label}</span>
                    <span className="text-slate-500 dark:text-slate-400">{value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-full rounded-full ${color}`} style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
