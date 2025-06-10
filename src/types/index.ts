export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  badges: Badge[];
  completedTopics: string[];
  currentStreak: number;
  level: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: Date;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  estimatedTime: string;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  videoUrl?: string;
  quiz?: Quiz;
  isCompleted?: boolean;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}