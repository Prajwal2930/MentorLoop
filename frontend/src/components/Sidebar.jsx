import { NavLink } from 'react-router-dom';

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '⌂' },
  { label: 'Analyze Code', path: '/analyze-code', icon: '⌁' },
  { label: 'GitHub Review', path: '/github-review', icon: '★' },
  { label: 'Onboarding', path: '/onboarding', icon: '✓' },
  { label: 'My Profile', path: '/profile', icon: '◉' },
  { label: 'My Skills', path: '/skills', icon: '⌘' },
];

const Sidebar = () => (
  <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-950 lg:block">
    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
      Workspace
    </p>
    <nav aria-label="Dashboard navigation" className="space-y-1">
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
            }`
          }
        >
          <span className="w-5 text-center text-base" aria-hidden="true">
            {item.icon}
          </span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
