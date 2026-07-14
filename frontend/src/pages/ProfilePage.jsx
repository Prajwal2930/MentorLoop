import useAuth from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  const initials = user?.fullName
    ?.split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Account</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">My profile</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Your MentorLoop account details.</p>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-28 bg-gradient-to-r from-indigo-600 to-violet-600" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-indigo-100 text-2xl font-bold text-indigo-700 dark:border-slate-900 dark:bg-indigo-500/20 dark:text-indigo-300">
            {user?.avatar ? <img src={user.avatar} alt={user.fullName} className="h-full w-full object-cover" /> : initials}
          </div>
          <h2 className="mt-4 text-2xl font-bold">{user?.fullName}</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300">{user?.email}</p>
        </div>

        <dl className="grid border-t border-slate-200 sm:grid-cols-2 dark:border-slate-800">
          <div className="border-b border-slate-200 px-6 py-5 sm:border-b-0 sm:border-r dark:border-slate-800">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Target role</dt>
            <dd className="mt-1 font-semibold">{user?.targetRole}</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Experience level</dt>
            <dd className="mt-1 capitalize font-semibold">{user?.experienceLevel}</dd>
          </div>
          <div className="border-t border-slate-200 px-6 py-5 sm:col-span-2 dark:border-slate-800">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">GitHub username</dt>
            <dd className="mt-1 font-semibold">{user?.githubUsername ? `@${user.githubUsername}` : 'Not added yet'}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
};

export default ProfilePage;
