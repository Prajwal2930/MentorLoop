import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import useAuth from '../hooks/useAuth';

const initialFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  targetRole: '',
  experienceLevel: 'beginner',
  githubUsername: '',
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((currentData) => ({ ...currentData, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate('/dashboard', { replace: true });
    } catch (registrationError) {
      setError(registrationError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6"><Logo /></div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} className="app-surface relative mx-auto w-full max-w-lg rounded-3xl p-6 sm:p-8">
        <p className="quiet-label text-indigo-600 dark:text-indigo-400">Start your developer studio</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-slate-900 dark:text-white">Create your account.</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Tell us where you are headed, then build a clearer path forward.</p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300" role="alert">
              {error}
            </p>
          )}
          <Input id="fullName" name="fullName" label="Full name" value={formData.fullName} onChange={handleChange} required autoComplete="name" />
          <Input id="email" name="email" type="email" label="Email address" value={formData.email} onChange={handleChange} required autoComplete="email" />
          <Input id="password" name="password" type="password" label="Password" value={formData.password} onChange={handleChange} required minLength="8" autoComplete="new-password" />
          <Input id="confirmPassword" name="confirmPassword" type="password" label="Confirm password" value={formData.confirmPassword} onChange={handleChange} required minLength="8" autoComplete="new-password" />
          <Input id="targetRole" name="targetRole" label="Target role" placeholder="e.g. MERN Stack Developer" value={formData.targetRole} onChange={handleChange} required />
          <div className="space-y-1.5">
            <label htmlFor="experienceLevel" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Experience level</label>
            <select id="experienceLevel" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="block w-full rounded-xl border border-slate-300 bg-white/90 px-3.5 py-3 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.03)] outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white dark:hover:border-slate-600 dark:focus:border-indigo-400">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <Input id="githubUsername" name="githubUsername" label="GitHub username (optional)" value={formData.githubUsername} onChange={handleChange} autoComplete="off" />
          <PrimaryButton type="submit" className="w-full" isLoading={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </PrimaryButton>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
