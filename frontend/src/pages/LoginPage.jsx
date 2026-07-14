import { useState } from 'react';
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
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
        <Logo />
        <h1 className="mt-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Continue building your developer momentum.</p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300" role="alert">
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
      </div>
    </div>
  );
};

export default LoginPage;
