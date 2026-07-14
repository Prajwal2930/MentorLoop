import { Link } from 'react-router-dom';

import Logo from '../components/Logo';

const NotFoundPage = () => (
  <main className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
    <div className="text-center">
      <div className="mx-auto w-fit"><Logo /></div>
      <p className="mt-12 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">Page not found</h1>
      <p className="mt-4 max-w-md text-slate-600 dark:text-slate-300">The page you are looking for does not exist or may have moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Return home</Link>
    </div>
  </main>
);

export default NotFoundPage;
