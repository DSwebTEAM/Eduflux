import React from 'react';
import { BookOpen, Calculator, MessageCircle, Trophy, User } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">NCERT Learn</h1>
              <p className="text-xs text-gray-500">Class 12 Interactive Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CALCULATOR' })}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Calculator"
            >
              <Calculator className="h-5 w-5" />
            </button>

            <button
              onClick={() => dispatch({ type: 'TOGGLE_CHATBOT' })}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="AI Assistant"
            >
              <MessageCircle className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {state.user?.points} pts
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700">{state.user?.name}</p>
                <p className="text-xs text-gray-500">Level {state.user?.level}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}