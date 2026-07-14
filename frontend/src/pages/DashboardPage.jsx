import useAuth from '../hooks/useAuth';

const stats = [
  { label: 'Learning streak', value: '0 days', detail: 'Start today', color: 'text-indigo-600 dark:text-indigo-400' },
  { label: 'Completed tasks', value: '0', detail: 'Your first task awaits', color: 'text-violet-600 dark:text-violet-400' },
  { label: 'Progress', value: '0%', detail: 'Set your first milestone', color: 'text-cyan-600 dark:text-cyan-400' },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const firstName = user?.fullName?.split(' ')[0] || 'there';

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section>
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Your workspace</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {firstName}.</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Small, consistent steps will move your career forward.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className={`mt-3 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent activity</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">Coming soon</span>
          </div>
          <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <p className="font-medium text-slate-700 dark:text-slate-200">Your activity will appear here.</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Start a learning task to build your timeline.</p>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Learning progress</h2>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">0%</span>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full w-0 rounded-full bg-indigo-600" /></div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Your personalized progress view will be available as you begin learning.</p>
        </article>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Upcoming tasks</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">0 tasks</span>
        </div>
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">No tasks scheduled yet. Your Day 1 workspace is ready.</p>
      </section>
    </div>
  );
};

export default DashboardPage;
