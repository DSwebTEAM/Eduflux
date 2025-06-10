import React from 'react';
import { Clock, CheckCircle, Trophy } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      type: 'completion',
      title: 'Completed Electric Charge topic',
      subject: 'Physics',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'quiz',
      title: 'Scored 90% in Chemistry Quiz',
      subject: 'Chemistry',
      time: '1 day ago',
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      type: 'study',
      title: 'Started Relations and Functions',
      subject: 'Mathematics',
      time: '2 days ago',
      icon: Clock,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{activity.subject}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
        View all activity
      </button>
    </div>
  );
}