import { createContext, useContext, useMemo, useState } from 'react';

const OnboardingContext = createContext(null);

const initialProfile = {
  fullName: '',
  bio: '',
  college: '',
  graduationYear: '',
  targetRole: '',
  experienceLevel: 'beginner',
  preferredLearningStyle: 'mixed',
  dailyLearningGoal: 60,
};

export const OnboardingProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialProfile);
  const [skills, setSkills] = useState([]);

  const value = useMemo(() => ({
    profile,
    skills,
    updateProfile: (field, valueToSet) => setProfile((current) => ({ ...current, [field]: valueToSet })),
    setSkills,
  }), [profile, skills]);

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider.');
  }

  return context;
};
