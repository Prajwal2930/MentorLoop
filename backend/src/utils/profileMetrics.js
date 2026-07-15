const ONBOARDING_FIELDS = [
  'fullName',
  'bio',
  'college',
  'graduationYear',
  'targetRole',
  'experienceLevel',
  'preferredLearningStyle',
  'dailyLearningGoal',
];

const hasValue = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  return value !== null && value !== undefined;
};

/** Calculate the user's onboarding profile completion from required profile fields. */
const getProfileCompletion = (user) => {
  const completedFields = ONBOARDING_FIELDS.filter((field) => hasValue(user[field]));
  const percentage = Math.round((completedFields.length / ONBOARDING_FIELDS.length) * 100);

  return {
    percentage,
    completedFields: completedFields.length,
    totalFields: ONBOARDING_FIELDS.length,
    isComplete: percentage === 100,
  };
};

module.exports = { getProfileCompletion };
