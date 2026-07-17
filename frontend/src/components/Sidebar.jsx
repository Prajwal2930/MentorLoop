import { useState } from 'react';
import { BarChart3, BrainCircuit, ChevronLeft, ChevronRight, Code2, GitFork, History, LayoutDashboard, Map, UserRound, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Analyze Code', path: '/analyze-code', icon: Code2 },
  { label: 'GitHub Review', path: '/github-review', icon: GitFork },
  { label: 'Roadmap', path: '/roadmap', icon: Map },
  { label: 'Mock Interview', path: '/interview', icon: BrainCircuit },
  { label: 'Interview History', path: '/interview/history', icon: History },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'My Profile', path: '/profile', icon: UserRound },
  { label: 'My Skills', path: '/skills', icon: Wrench },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return <motion.aside animate={{ width: collapsed ? 84 : 264 }} transition={{ type: 'spring', stiffness: 280, damping: 28 }} className="hidden shrink-0 border-r border-slate-200/80 bg-white/80 px-3 py-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75 lg:block"><div className={`mb-6 flex items-center ${collapsed ? 'justify-center' : 'justify-between px-2'}`}>{!collapsed && <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">Workspace</p>}<button type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-900 dark:hover:text-white">{collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}</button></div><nav aria-label="Dashboard navigation" className="space-y-1">{navigationItems.map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} title={collapsed ? label : undefined} className={({ isActive }) => `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${collapsed ? 'justify-center' : ''} ${isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'}`}>{({ isActive }) => <><Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={isActive ? 2.35 : 1.9} /><span className={collapsed ? 'sr-only' : 'truncate'}>{label}</span>{isActive && !collapsed && <motion.span layoutId="sidebar-active" className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}</>}</NavLink>)}</nav></motion.aside>;
};

export default Sidebar;
