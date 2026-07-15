const SUPPORTED_SKILLS = ['Java', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Spring Boot', 'Python', 'Git', 'Docker', 'DSA'];

const SkillSelector = ({ selectedSkills, onChange }) => {
  const selectedNames = selectedSkills.map((skill) => skill.skillName);

  const toggleSkill = (skillName) => {
    if (selectedNames.includes(skillName)) {
      onChange(selectedSkills.filter((skill) => skill.skillName !== skillName));
      return;
    }

    onChange([...selectedSkills, { skillName, level: 0, confidence: 'low' }]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {SUPPORTED_SKILLS.map((skillName) => {
        const selected = selectedNames.includes(skillName);
        return <button key={skillName} type="button" onClick={() => toggleSkill(skillName)} className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${selected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}>{skillName}</button>;
      })}
    </div>
  );
};

export default SkillSelector;
