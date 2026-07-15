import { useEffect, useState } from 'react';
import AnalysisCard from '../components/AnalysisCard';
import AnalysisLoading from '../components/AnalysisLoading';
import AnalyzeButton from '../components/AnalyzeButton';
import BestPracticeCard from '../components/BestPracticeCard';
import CodeEditor from '../components/CodeEditor';
import ErrorCard from '../components/ErrorCard';
import InterviewQuestionCard from '../components/InterviewQuestionCard';
import LanguageSelector from '../components/LanguageSelector';
import SectionCard from '../components/SectionCard';
import { analyzeCode, getAnalysisById, getAnalysisHistory } from '../services/codeAnalysisService';

const AnalyzeCodePage = () => {
  const [language, setLanguage] = useState('javascript'); const [code, setCode] = useState(''); const [analysis, setAnalysis] = useState(null); const [history, setHistory] = useState([]); const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  const loadHistory = async () => { try { const { analyses } = await getAnalysisHistory(); setHistory(analyses); } catch { /* History is non-critical to analysis. */ } };
  useEffect(() => { loadHistory(); }, []);
  const submit = async () => { if (!code.trim()) return setError('Paste code before starting an analysis.'); setLoading(true); setError(''); try { const { analysis: result } = await analyzeCode({ language, code }); setAnalysis(result); await loadHistory(); } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to analyze code.'); } finally { setLoading(false); } };
  const openHistory = async (id) => { try { const { analysis: savedAnalysis } = await getAnalysisById(id); setAnalysis(savedAnalysis); setLanguage(savedAnalysis.language); setCode(savedAnalysis.originalCode); } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to load this analysis.'); } };
  return <div className="mx-auto max-w-7xl space-y-7"><div><p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">AI Code Analyzer</p><h1 className="mt-1 text-3xl font-bold">Review your code like a mentor.</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Get structured feedback on correctness, best practices, concepts, and interview readiness.</p></div><div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]"><div className="space-y-5"><SectionCard><div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><LanguageSelector value={language} onChange={setLanguage} /><AnalyzeButton onClick={submit} isLoading={loading} disabled={!code.trim()} /></div><CodeEditor language={language} value={code} onChange={setCode} /></SectionCard>{error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{error}</p>}{loading && <AnalysisLoading />}{analysis && !loading && <div className="grid gap-5"><AnalysisCard summary={analysis.summary} practiceTask={analysis.practiceTask} /><ErrorCard errors={analysis.errors} /><BestPracticeCard practices={analysis.bestPractices} /><SectionCard><h2 className="text-lg font-bold">Concepts to review</h2><div className="mt-4 space-y-3">{analysis.concepts.map((concept, index) => <div key={`${concept.name}-${index}`}><p className="font-semibold">{concept.name}</p><p className="text-sm text-slate-600 dark:text-slate-300">{concept.explanation}</p></div>)}</div></SectionCard><InterviewQuestionCard questions={analysis.interviewQuestions} /></div>}</div><aside><SectionCard><h2 className="font-bold">Previous analyses</h2><div className="mt-4 space-y-2">{history.length ? history.map((item) => <button key={item._id} type="button" onClick={() => openHistory(item._id)} className="w-full rounded-lg border border-slate-200 p-3 text-left text-sm hover:border-indigo-400 dark:border-slate-700"><p className="font-semibold capitalize">{item.language}</p><p className="mt-1 line-clamp-2 text-slate-500 dark:text-slate-400">{item.summary}</p></button>) : <p className="text-sm text-slate-500">Your saved analyses will appear here.</p>}</div></SectionCard></aside></div></div>;
};

export default AnalyzeCodePage;
