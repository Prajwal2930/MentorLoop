import { useEffect, useState } from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Logo from './Logo';
import PrimaryButton from './PrimaryButton';

const Navbar = () => {
  const navigate = useNavigate(); const { isAuthenticated, logout, user } = useAuth();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('mentorloop_theme') === 'dark');
  useEffect(() => { document.documentElement.classList.toggle('dark', isDark); localStorage.setItem('mentorloop_theme', isDark ? 'dark' : 'light'); }, [isDark]);
  const navLinkClass = ({ isActive }) => `text-sm font-semibold transition ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`;
  return <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-950/80"><nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8"><Logo /><div className="hidden items-center gap-7 md:flex"><NavLink to="/" className={navLinkClass}>Home</NavLink>{isAuthenticated && <><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink><NavLink to="/profile" className={navLinkClass}>Profile</NavLink></>}</div><div className="flex items-center gap-2.5"><motion.button type="button" onClick={() => setIsDark((value) => !value)} whileTap={{ scale: 0.92 }} className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</motion.button>{isAuthenticated ? <><span className="hidden rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 sm:block dark:bg-slate-900 dark:text-slate-200">{user?.fullName?.split(' ')[0]}</span><button type="button" onClick={() => { logout(); navigate('/login'); }} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"><LogOut className="h-4 w-4" />Log out</button></> : <><Link to="/login" className="hidden text-sm font-semibold text-slate-700 transition hover:text-indigo-600 sm:block dark:text-slate-200 dark:hover:text-indigo-400">Log in</Link><PrimaryButton onClick={() => navigate('/register')} className="hidden sm:inline-flex">Get started</PrimaryButton></>}</div></nav></header>;
};

export default Navbar;
