import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuizForm } from './components/QuizForm';
import { QuizDisplay } from './components/QuizDisplay';
import { QuizHistory } from './components/QuizHistory';
import { DifficultyLevel, QuizData } from './types';
import { AlertCircle, BrainCircuit, BookOpen } from 'lucide-react';

const STORAGE_KEY = 'ai_study_helper_history';

export default function App() {
  const [subject, setSubject] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');

  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [history, setHistory] = useState<QuizData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save quiz history', e);
    }
  }, [history]);

  const handleGenerateQuiz = async () => {
    if (!subject.trim() ||!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject.trim(),
          topic: topic.trim(),
          difficulty,
        }),
      });

      const responseData = await res.json();

      if (!responseData.success ||!responseData.data) {
        throw new Error(responseData.error || 'Failed to generate quiz.');
      }

      const newQuiz: QuizData = responseData.data;
      setActiveQuiz(newQuiz);

      setHistory((prev) => [newQuiz,...prev.filter((q) => q.id!== newQuiz.id)].slice(0, 25));

      setTimeout(() => {
        document.getElementById('quiz-results-container')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Quiz Generation Error:', err);
      setError(
        err.message || 'An unexpected error occurred while generating the quiz. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSubject('');
    setTopic('');
    setDifficulty('Medium');
    setActiveQuiz(null);
    setError(null);
  };

  const handleSelectHistoryQuiz = (quiz: QuizData) => {
    setSubject(quiz.subject);
    setTopic(quiz.topic);
    setDifficulty(quiz.difficulty);
    setActiveQuiz(quiz);
    setError(null);
  };

  const handleDeleteHistoryQuiz = (quizId: string) => {
    setHistory((prev) => prev.filter((q) => q.id!== quizId));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased">
      <Header
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Master Any Topic with AI Quizzes
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Generate 5 targeted multiple choice questions and 2 conceptual short answer questions formatted for effective study sessions.
          </p>
        </div>

        <QuizForm
          subject={subject}
          setSubject={setSubject}
          topic={topic}
          setTopic={setTopic}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onGenerate={handleGenerateQuiz}
          onClear={handleClear}
          isLoading={isLoading}
          hasActiveQuiz={!!activeQuiz}
        />

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 text-rose-900 flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <span className="font-bold block mb-0.5">Generation Error</span>
              <p className="text-rose-700 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {activeQuiz &&!isLoading && (
          <QuizDisplay
            quiz={activeQuiz}
            onRetake={() => {
              document.getElementById('quiz-results-container')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {isLoading && (
          <div className="bg-white rounded-2xl border-slate-200 p-8 text-center space-y-4 animate-pulse shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
              <BrainCircuit className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Generating Your Study Quiz...</h3>
              <p className="text-xs text-slate-500 mt-1">
                Creating 5 multiple choice questions with explanations and 2 short questions for <span className="font-semibold text-indigo-600">{topic || subject}</span>.
              </p>
            </div>
          </div>
        )}
      </main>

      <QuizHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectQuiz={handleSelectHistoryQuiz}
        onClearHistory={handleClearHistory}
        onDeleteQuiz={handleDeleteHistoryQuiz}
      />

      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 font-medium">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>AI Study Helper</span>
            <span>• Powered by Gemini AI</span>
          </div>
          <p>© {new Date().getFullYear()} AI Study Helper. Ready for mobile and desktop study.</p>
        </div>
      </footer>
    </div>
  );
  }
