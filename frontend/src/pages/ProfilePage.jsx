import { useEffect, useState } from 'react';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';
import PrimaryButton from '../components/PrimaryButton';
import SectionCard from '../components/SectionCard';
import { connectGithub } from '../services/githubService';
import { getProfile, updateProfile } from '../services/profileService';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); const [message, setMessage] = useState(''); const [error, setError] = useState('');
  useEffect(() => { getProfile().then(({ user }) => setProfile(user)).catch((e) => setError(e.response?.data?.message || 'Unable to load profile.')); }, []);
  if (!profile) return error ? <p className="text-red-600">{error}</p> : <LoadingSpinner />;
  const change = (event) => setProfile({ ...profile, [event.target.name]: event.target.value });
  const save = async (event) => { event.preventDefault(); setError(''); try { const profileData = { fullName: profile.fullName, bio: profile.bio, college: profile.college, graduationYear: Number(profile.graduationYear), targetRole: profile.targetRole, experienceLevel: profile.experienceLevel }; if (profile.preferredLearningStyle) profileData.preferredLearningStyle = profile.preferredLearningStyle; if (profile.dailyLearningGoal) profileData.dailyLearningGoal = Number(profile.dailyLearningGoal); const { user } = await updateProfile(profileData); setProfile(user); setMessage('Profile saved.'); } catch (e) { setError(e.response?.data?.message || 'Unable to save profile.'); } };
  const github = async () => { try { const data = await connectGithub(profile.githubUsername); setProfile({ ...profile, ...data }); setMessage('GitHub connected.'); } catch (e) { setError(e.response?.data?.message || 'Unable to connect GitHub.'); } };
  return <div className="mx-auto max-w-3xl"><h1 className="text-3xl font-bold">My profile</h1><p className="mt-2 text-slate-500">Manage your learning profile and GitHub account.</p><SectionCard className="mt-6"><form className="space-y-4" onSubmit={save}>{error && <p className="text-sm text-red-600">{error}</p>}{message && <p className="text-sm text-emerald-600">{message}</p>}<Input id="fullName" name="fullName" label="Full name" value={profile.fullName || ''} onChange={change} required /><Input id="bio" name="bio" label="Bio" value={profile.bio || ''} onChange={change} required /><Input id="college" name="college" label="College" value={profile.college || ''} onChange={change} required /><Input id="graduationYear" name="graduationYear" type="number" label="Graduation year" value={profile.graduationYear || ''} onChange={change} required /><Input id="targetRole" name="targetRole" label="Target role" value={profile.targetRole || ''} onChange={change} required /><PrimaryButton type="submit" className="w-full sm:w-auto">Save profile</PrimaryButton></form></SectionCard><SectionCard className="mt-6"><h2 className="text-lg font-bold">GitHub account</h2><div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"><div className="min-w-0 flex-1"><Input id="githubUsername" name="githubUsername" label="GitHub username" value={profile.githubUsername || ''} onChange={change} /></div><PrimaryButton className="w-full shrink-0 sm:w-auto" onClick={github}>{profile.githubConnected ? 'Reconnect' : 'Connect GitHub'}</PrimaryButton></div></SectionCard></div>;
};
export default ProfilePage;
