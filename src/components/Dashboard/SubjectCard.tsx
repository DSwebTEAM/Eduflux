import React from 'react';
import { Subject } from '../../types';
import { Zap, Flask, Calculator, Book, Globe, Palette, Music, Heart, Dumbbell, Code } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface SubjectCardProps {
  subject: Subject;
  onSelect: (subject: Subject) => void;
}

// Create a map of icon names to components
const iconMap = {
  Zap,
  Flask,
  Calculator,
  Book,
  Globe,
  Palette,
  Music,
  Heart,
  Dumbbell,
  Code
};

export default function SubjectCard({ subject, onSelect }: SubjectCardProps) {
  const { state } = useApp();
  const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || Book; // Fallback to Book icon
  
  const completedTopics = subject.chapters.reduce((total, chapter) => {
    return total + chapter.topics.filter(topic => 
      state.user?.completedTopics.includes(topic.id)
    ).length;
  }, 0);
  
  const totalTopics = subject.chapters.reduce((total, chapter) => total + chapter.topics.length, 0);
  const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
  };

  return (
    <div
      onClick={() => onSelect(subject)}
      className={`relative group cursor-pointer rounded-xl p-6 bg-gradient-to-br ${colorClasses[subject.color as keyof typeof colorClasses]} text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <IconComponent className="h-8 w-8" />
        <div className="text-right">
          <p className="text-sm opacity-90">{completedTopics}/{totalTopics} Topics</p>
          <p className="text-xs opacity-75">Completed</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
      <p className="text-sm opacity-90 mb-4">{subject.chapters.length} Chapters</p>

      <div className="w-full bg-white/20 rounded-full h-2">
        <div
          className="bg-white rounded-full h-2 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs opacity-75 mt-2">{Math.round(progress)}% Complete</p>

      <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
    </div>
  );
}