import { Link } from 'react-router-dom';

const Logo = ({ compact = false }) => (
  <Link to="/" className="inline-flex items-center gap-2.5" aria-label="MentorLoop home">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm shadow-indigo-500/30">
      &lt;/&gt;
    </span>
    {!compact && (
      <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        Mentor<span className="text-indigo-600 dark:text-indigo-400">Loop</span>
      </span>
    )}
  </Link>
);

export default Logo;
