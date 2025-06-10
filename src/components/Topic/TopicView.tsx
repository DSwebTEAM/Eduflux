import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Award } from 'lucide-react';
import { Topic, Chapter, Subject } from '../../types';
import { useApp } from '../../contexts/AppContext';
import Quiz from '../Quiz/Quiz';

interface TopicViewProps {
  topic: Topic;
  chapter: Chapter;
  subject: Subject;
  onBack: () => void;
}

export default function TopicView({ topic, chapter, subject, onBack }: TopicViewProps) {
  const { state, dispatch } = useApp();
  const [showQuiz, setShowQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(
    state.user?.completedTopics.includes(topic.id) || false
  );

  const handleComplete = () => {
    if (!isCompleted) {
      dispatch({ type: 'COMPLETE_TOPIC', payload: topic.id });
      dispatch({ type: 'UPDATE_POINTS', payload: 50 });
      setIsCompleted(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    dispatch({ type: 'UPDATE_POINTS', payload: score });
    setShowQuiz(false);
    handleComplete();
  };

  if (showQuiz && topic.quiz) {
    return (
      <Quiz
        quiz={topic.quiz}
        onComplete={handleQuizComplete}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to {chapter.title}</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
              <p className="text-indigo-100">{subject.name} • {chapter.title}</p>
            </div>
            {isCompleted && (
              <div className="flex items-center space-x-2 bg-green-500 px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>

        {/* Video Section */}
        {topic.videoUrl && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Watch Video</h3>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={topic.videoUrl}
                className="w-full h-64 rounded-lg"
                frameBorder="0"
                allowFullScreen
                title={`${topic.title} Video`}
              />
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          <div className="prose max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {topic.content}
            </div>
          </div>

          {/* Key Points */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Points</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <ul className="space-y-2">
                {topic.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isCompleted
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
            </button>

            {topic.quiz && (
              <button
                onClick={() => setShowQuiz(true)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                <Award className="h-4 w-4" />
                <span>Take Quiz</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}