import React from 'react';
import { DifficultyLevel } from '../types';
import { Wand2, Trash2, Loader2 } from 'lucide-react';

interface QuizFormProps {
  subject: string;
  setSubject: (val: string) => void;
  topic: string;
  setTopic: (val: string) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (val: DifficultyLevel) => void;
  onGenerate: () => void;
  onClear: () => void;
  isLoading: boolean;
  hasActiveQuiz: boolean;
}

const presetChips = [
  { subject: 'Biology', topic: 'Cellular Respiration' },
  { subject: 'Computer Science', topic: 'Binary Search Trees' },
  { subject: 'History', topic: 'The Industrial Revolution' },
];

export const QuizForm: React.FC<QuizFormProps> = ({
  subject, setSubject, topic, setTopic, difficulty, setDifficulty,
  onGenerate, onClear, isLoading, hasActiveQuiz
}) => {
  return (
    <div className="bg-white rounded-2xl border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Biology"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Cellular Respiration"
            className="w-full px-3 py-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {presetChips.map((chip) => (
          <button key={chip.topic} onClick={() => {setSubject(chip.subject); setTopic(chip.topic)}} 
            className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100">
            {chip.subject}: {chip.topic}
          </button>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
         
