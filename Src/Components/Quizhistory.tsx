import React from 'react';
import { QuizData } from '../types';
import { X, Trash2, Clock, BookOpen } from 'lucide-react';

interface QuizHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: QuizData[];
  onSelectQuiz: (quiz: QuizData) => void;
  onClearHistory: () => void;
  onDeleteQuiz: (quizId: string) => void;
}

export const QuizHistory: React.FC<QuizHistoryProps> = ({
  isOpen, onClose, history, onSelectQuiz, onClearHistory, onDeleteQuiz
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600"/> Quiz History
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5"/>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              <BookOpen className="w-12 h-12 mx-auto mb-2 text-slate-300"/>
              <p>No quizzes yet. Generate one!</p>
            </div>
          ) : (
            history.map((quiz) => (
              <div key={quiz.id} className="p-3 border-slate-200 rounded-xl hover:bg-slate-50 group">
