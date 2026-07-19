import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Logo from './Logo';
import PrimaryButton from './PrimaryButton';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }) => `text-sm font-semibold transition ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`;
  const mobileItems = isAuthenticated
    ? [{ label: 'Dashboard', path: '/dashboard' }, { label: 'Analyze Code', path: '/analyze-code' }, { label: 'GitHub Review', path: '/github-review' }, { label: 'Roadmap', path: '/roadmap' }, { label: 'Mock Interview', path: '/interview' }, { label: 'Analytics', path: '/analytics' }, { label: 'Profile', path: '/profile' }, { label: 'Skills', path: '/skills' }]
    : [{ label: 'Home', path: '/' }, { label: 'Log in', path: '/login' }, { label: 'Get started', path: '/register' }];
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-950/80">
      <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          {isAuthenticated && <><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink><NavLink to="/profile" className={navLinkClass}>Profile</NavLink></>}
        </div>
        <div className="flex items-center gap-2.5">
          {isAuthenticated ? <>
            <span className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700 sm:block dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">{user?.fullName?.split(' ')[0]}</span>
            <button type="button" onClick={() => { logout(); navigate('/login'); }} className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Log out</span></button>
          </> : <>
            <Link to="/login" className="hidden text-sm font-semibold text-slate-700 transition hover:text-indigo-600 sm:block dark:text-slate-200 dark:hover:text-indigo-400">Log in</Link>
            <PrimaryButton onClick={() => navigate('/register')} className="hidden sm:inline-flex">Get started</PrimaryButton>
          </>}
          <button type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation menu" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 transition hover:bg-slate-100 lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {isMenuOpen && <div id="mobile-navigation" className="border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-lg lg:hidden dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-1 sm:grid-cols-3">
          {mobileItems.map((item) => <NavLink key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'}`}>{item.label}</NavLink>)}
        </div>
      </div>}
    </header>
  );
};

export default Navbar;
