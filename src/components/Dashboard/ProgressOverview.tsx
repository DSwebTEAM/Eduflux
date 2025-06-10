import React from 'react';
import { TrendingUp, Award, Target, Flame } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function ProgressOverview() {
  const { state } = useApp();

  const stats = [
    {
      label: 'Points Earned',
      value: state.user?.points || 0,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Badges Earned',
      value: state.user?.badges.length || 0,
      icon: Award,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      label: 'Topics Completed',
      value: state.user?.completedTopics.length || 0,
      icon: Target,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Current Streak',
      value: state.user?.currentStreak || 0,
      icon: Flame,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Progress</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-2`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Level Progress</span>
          <span className="text-sm text-gray-500">Level {state.user?.level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '68%' }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">68% to next level</p>
      </div>
    </div>
  );
}