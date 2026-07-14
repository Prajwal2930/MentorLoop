import { useState } from 'react';
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
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
        <Logo />
        <h1 className="mt-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Create your account</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Tell us where you are headed, and start tracking your progress.</p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300" role="alert">
              {error}
            </p>
          )}
          <Input id="fullName" name="fullName" label="Full name" value={formData.fullName} onChange={handleChange} required autoComplete="name" />
          <Input id="email" name="email" type="email" label="Email address" value={formData.email} onChange={handleChange} required autoComplete="email" />
          <Input id="password" name="password" type="password" label="Password" value={formData.password} onChange={handleChange} required minLength="8" autoComplete="new-password" />
          <Input id="confirmPassword" name="confirmPassword" type="password" label="Confirm password" value={formData.confirmPassword} onChange={handleChange} required minLength="8" autoComplete="new-password" />
          <Input id="targetRole" name="targetRole" label="Target role" placeholder="e.g. MERN Stack Developer" value={formData.targetRole} onChange={handleChange} required />
          <div className="space-y-1.5">
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Experience level</label>
            <select id="experienceLevel" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400">
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
      </div>
    </div>
  );
};

export default RegisterPage;
