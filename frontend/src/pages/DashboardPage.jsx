import { ArrowRight, BrainCircuit, Code2, Map, Sparkles, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import CountUpModule from 'react-countup';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionCard from '../components/SectionCard';
import { getAnalytics } from '../services/analyticsService';
import { getDashboard } from '../services/dashboardService';

const CountUp = CountUpModule.default;

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState(null);


  useEffect(() => {
    getDashboard().then(setDashboard).catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load dashboard.'));
  }, []);


  useEffect(() => {
    getAnalytics().then(({ analytics: data }) => setAnalytics(data)).catch((e) => setError(e.response?.data?.message || 'Unable to load analytics.'));
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!dashboard || !analytics) {
    return <LoadingSpinner label="Calculating your analytics..." />;
  }

  const interviewTrend = Array.isArray(analytics?.interviewTrend)
    ? analytics.interviewTrend.map((item) => ({
      label: new Date(item.date).toLocaleDateString(),
      score: item.score
    }))
    : [];

  const { user, careerGoal, profileCompletion, skills, careerReadinessScore, recentActivityMessage, roadmap } = dashboard;
  const stats = [
    { label: 'Career readiness', value: careerReadinessScore, suffix: '%', icon: Sparkles, tone: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Profile completion', value: profileCompletion.percentage, suffix: '%', icon: Target, tone: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Skills tracked', value: skills.length, suffix: '', icon: Code2, tone: 'text-violet-600 dark:text-violet-400' },
  ];




  return (
    <div className="mx-auto max-w-6xl space-y-6 lg:space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-sm shadow-slate-950/[0.03] backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/75">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="relative"><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Developer studio</p><h1 className="mt-3 break-words text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {user.fullName.split(' ')[0]}.</h1><p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">Your next move toward <span className="font-semibold text-slate-900 dark:text-white">{careerGoal.targetRole}</span> is already mapped out.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link to="/analyze-code" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-slate-950"><Code2 className="h-4 w-4" />Analyze code</Link><Link to="/github-review" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">Review a project<ArrowRight className="h-4 w-4" /></Link></div></div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">{stats.map(({ label, value, suffix, icon: Icon, tone }) => <SectionCard key={label}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p><p className={`mt-3 text-4xl font-bold tracking-tight ${tone}`}><CountUp end={value} duration={1.15} suffix={suffix} /></p></div><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Icon className="h-5 w-5" /></div></div></SectionCard>)}</section>

      <SectionCard className="border-indigo-200/80 dark:border-indigo-500/20"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400"><Map className="h-3.5 w-3.5" />Learning roadmap</p><h2 className="mt-2 break-words text-xl font-bold">{roadmap?.currentWeek ? `Week ${roadmap.currentWeek.weekNumber}: ${roadmap.currentWeek.title}` : 'Create your personalized roadmap'}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">Today's goal: {roadmap?.todayGoal || 'Generate a roadmap from your profile, skills, and recent work.'}</p></div><div className="flex items-center justify-between gap-4 sm:justify-end"><div className="text-left sm:text-right"><p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"><CountUp end={roadmap?.progress ?? 0} duration={0.9} suffix="%" /></p><p className="text-xs text-slate-500">overall progress</p></div><Link to={roadmap ? `/roadmap/${roadmap._id}` : '/roadmap'} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">{roadmap ? 'Open roadmap' : 'Generate roadmap'}</Link></div></div>{roadmap && <div className="mt-5 h-2 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-500/15"><div className="h-full rounded-full bg-indigo-600 transition-all duration-700" style={{ width: `${roadmap.progress}%` }} /></div>}</SectionCard>

      <section className="grid gap-5 lg:grid-cols-2"><SectionCard><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold">Skill momentum</h2><Link to="/skills" className="shrink-0 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Manage skills</Link></div><div className="mt-5 space-y-4">{skills.length ? skills.map((skill) => <div key={skill._id}><div className="mb-1.5 flex justify-between gap-3 text-sm"><span className="min-w-0 truncate font-medium">{skill.skillName}</span><span className="shrink-0 text-slate-500">{skill.level}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-slate-950 transition-all duration-700 dark:bg-indigo-400" style={{ width: `${skill.level}%` }} /></div></div>) : <p className="rounded-xl border border-dashed p-5 text-sm text-slate-500">Add skills to start tracking your momentum.</p>}</div></SectionCard><SectionCard><div className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-violet-600 dark:text-violet-400" /><h2 className="text-lg font-bold">Studio activity</h2></div>
        <div className="mt-4 space-y-3">{analytics.recentActivities.length ? analytics.recentActivities.map((activity, index) => <div key={`${activity.type}-${index}`} className="flex justify-between gap-4 border-b border-slate-100 pb-3 text-sm last:border-0 dark:border-slate-800"><span>{activity.label}</span><span className="text-slate-500">{new Date(activity.date).toLocaleDateString()}</span></div>) : <p className="text-sm text-slate-500">Complete activities to see your progress timeline.</p>}</div></SectionCard></section>
    </div>
  );
};

export default DashboardPage;
