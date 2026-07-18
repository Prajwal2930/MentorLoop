import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((currentData) => ({ ...currentData, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6"><Logo /></div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} className="app-surface relative w-full max-w-md rounded-3xl p-6 sm:p-8">
        <p className="quiet-label text-indigo-600 dark:text-indigo-400">Developer workspace</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-slate-900 dark:text-white">Welcome back.</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Continue building your developer momentum.</p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300" role="alert">
              {error}
            </p>
          )}
          <Input id="email" name="email" type="email" label="Email address" value={formData.email} onChange={handleChange} required autoComplete="email" />
          <Input id="password" name="password" type="password" label="Password" value={formData.password} onChange={handleChange} required autoComplete="current-password" />
          <PrimaryButton type="submit" className="w-full" isLoading={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </PrimaryButton>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          New to MentorLoop?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
