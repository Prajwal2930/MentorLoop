import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import Logo from './Logo';
import PrimaryButton from './PrimaryButton';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('mentorloop_theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('mentorloop_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDark((currentTheme) => !currentTheme)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>

          {isAuthenticated ? (
            <>
              <span className="hidden text-sm font-medium text-slate-700 sm:block dark:text-slate-200">
                {user?.fullName?.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-semibold text-slate-600 transition hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-sm font-semibold text-slate-700 transition hover:text-indigo-600 sm:block dark:text-slate-200 dark:hover:text-indigo-400"
              >
                Log in
              </Link>
              <PrimaryButton onClick={() => navigate('/register')} className="hidden sm:inline-flex">
                Get started
              </PrimaryButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
