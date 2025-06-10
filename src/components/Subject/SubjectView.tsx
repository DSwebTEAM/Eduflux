import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Subject, Chapter, Topic } from '../../types';
import ChapterList from './ChapterList';
import TopicView from '../Topic/TopicView';

interface SubjectViewProps {
  subject: Subject;
  onBack: () => void;
}

export default function SubjectView({ subject, onBack }: SubjectViewProps) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  if (selectedTopic && selectedChapter) {
    return (
      <TopicView
        topic={selectedTopic}
        chapter={selectedChapter}
        subject={subject}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  if (selectedChapter) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setSelectedChapter(null)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {subject.name}</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedChapter.title}</h1>
          <p className="text-gray-600 mb-6">{selectedChapter.description}</p>

          <div className="space-y-4">
            {selectedChapter.topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors"
              >
                <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {topic.content.substring(0, 120)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Dashboard</span>
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{subject.name}</h1>
        <p className="text-gray-600">NCERT Class 12 {subject.name} Chapters</p>
      </div>

      <ChapterList chapters={subject.chapters} onChapterSelect={setSelectedChapter} />
    </div>
  );
}