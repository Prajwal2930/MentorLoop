const LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'csharp', 'cpp', 'go', 'php', 'sql', 'html', 'css'];

const LanguageSelector = ({ value, onChange }) => (
  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
    Language
    <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900">
      {LANGUAGES.map((language) => <option key={language} value={language}>{language}</option>)}
    </select>
  </label>
);

export default LanguageSelector;
