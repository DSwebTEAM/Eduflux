import React from 'react';
import { subjects } from '../../data/subjects';
import { Subject } from '../../types';
import SubjectCard from './SubjectCard';
import ProgressOverview from './ProgressOverview';
import RecentActivity from './RecentActivity';

interface DashboardProps {
  onSubjectSelect: (subject: Subject) => void;
}

export default function Dashboard({ onSubjectSelect }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Continue your NCERT Class 12 journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <ProgressOverview />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onSelect={onSubjectSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}