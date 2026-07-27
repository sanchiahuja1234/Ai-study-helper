import React, { useState } from 'react';
import { QuizData } from '../types';
import { CheckCircle2, XCircle, RotateCcw, BookOpenCheck } from 'lucide-react';

interface QuizDisplayProps {
  quiz: QuizData;
  onRetake: () => void;
}

export const QuizDisplay: React.FC<QuizDisplayProps> = ({ quiz, onRetake }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [mode, setMode] = useState<'test' | 'study'>('test');

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({...prev, [qId]: optionIdx }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('quiz-results-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const score = quiz.multipleChoiceQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswerIndex).length;

  return (
    <div id="quiz-results-container" className="bg-white rounded-2xl border-slate-200 p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{quiz.subject}: {quiz.topic}</h3>
          <p className="text-sm text-slate-500">Difficulty: {quiz.difficulty}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setMode('test')} className={`px-3 py-1.5 text-sm rounded-lg ${mode === 'test'? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>Test Mode</button>
          <button onClick={() => setMode('study')} className={`px-3 py-1.5 text-sm rounded-lg ${mode === 'study'? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>Study Guide</button>
        </div>
      </div>

      {mode === 'test' && showResults && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
          <p className="text-sm text-indigo-700">Your Score</p>
