import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => (
  <div className="overflow-hidden rounded-xl border border-slate-700 shadow-sm">
    <Editor
      height="460px"
      language={language}
      value={value}
      theme="vs-dark"
      onChange={(nextValue) => onChange(nextValue || '')}
      options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: 'on', padding: { top: 16 } }}
    />
  </div>
);

export default CodeEditor;
