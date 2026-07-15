import { useEffect, useState } from 'react';

import LoadingSpinner from '../components/LoadingSpinner';
import PrimaryButton from '../components/PrimaryButton';
import SectionCard from '../components/SectionCard';
import SkillSelector from '../components/SkillSelector';
import { createSkill, deleteSkill, getSkills, updateSkill } from '../services/skillService';

const SkillsPage = () => {
  const [skills, setSkills] = useState(null);
  const [draft, setDraft] = useState([]);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadSkills = async () => {
    try {
      const { skills: savedSkills } = await getSkills();
      setSkills(savedSkills);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load skills.');
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const addSkills = async () => {
    setIsSaving(true);
    setError('');
    try {
      await Promise.all(draft.map(({ skillName, level, confidence }) => createSkill({ skillName, level, confidence })));
      setDraft([]);
      await loadSkills();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to add skills.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveSkill = async (skillId, changes) => {
    setError('');
    try {
      const { skill: updatedSkill } = await updateSkill(skillId, changes);
      setSkills((currentSkills) => currentSkills.map((skill) => (skill._id === skillId ? updatedSkill : skill)));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to update this skill.');
      await loadSkills();
    }
  };

  const removeSkill = async (skillId) => {
    setError('');
    try {
      await deleteSkill(skillId);
      setSkills((currentSkills) => currentSkills.filter((skill) => skill._id !== skillId));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete this skill.');
    }
  };

  if (!skills) {
    return error ? <p className="text-red-600">{error}</p> : <LoadingSpinner />;
  }

  const existingSkillNames = new Set(skills.map((skill) => skill.skillName));

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold">My skills</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Track your current level and confidence for each technology.</p>

      {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{error}</p>}

      <SectionCard className="mt-6">
        <h2 className="font-bold">Add skills</h2>
        <div className="mt-4">
          <SkillSelector
            selectedSkills={draft}
            onChange={(selectedSkills) => setDraft(selectedSkills.filter((skill) => !existingSkillNames.has(skill.skillName)))}
          />
        </div>
        <PrimaryButton className="mt-4" onClick={addSkills} disabled={!draft.length} isLoading={isSaving}>
          {isSaving ? 'Adding skills...' : 'Add selected'}
        </PrimaryButton>
      </SectionCard>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <SectionCard key={skill._id}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-bold">{skill.skillName}</h2>
              <button type="button" onClick={() => removeSkill(skill._id)} className="text-sm font-semibold text-red-600 hover:text-red-700">Delete</button>
            </div>

            <label className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Level: {skill.level}%
              <input
                className="mt-2 w-full accent-indigo-600"
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(event) => setSkills((currentSkills) => currentSkills.map((item) => item._id === skill._id ? { ...item, level: Number(event.target.value) } : item))}
                onMouseUp={(event) => saveSkill(skill._id, { level: Number(event.currentTarget.value) })}
                onKeyUp={(event) => saveSkill(skill._id, { level: Number(event.currentTarget.value) })}
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Confidence
              <select
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                value={skill.confidence}
                onChange={(event) => saveSkill(skill._id, { confidence: event.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </SectionCard>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
