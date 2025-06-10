import React from 'react';
import { Chapter } from '../../types';
import { Clock, BookOpen, CheckCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface ChapterListProps {
  chapters: Chapter[];
  onChapterSelect: (chapter: Chapter) => void;
}

export default function ChapterList({ chapters, onChapterSelect }: ChapterListProps) {
  const { state } = useApp();

  return (
    <div className="grid gap-6">
      {chapters.map((chapter, index) => {
        const completedTopics = chapter.topics.filter(topic =>
          state.user?.completedTopics.includes(topic.id)
        ).length;
        const progress = (completedTopics / chapter.topics.length) * 100;

        return (
          <div
            key={chapter.id}
            onClick={() => onChapterSelect(chapter)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">{chapter.title}</h3>
                </div>
                <p className="text-gray-600 ml-11">{chapter.description}</p>
              </div>
            </div>

            <div className="ml-11">
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{chapter.topics.length} Topics</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{chapter.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{completedTopics} Completed</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% Complete</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}