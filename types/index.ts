export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  content: LessonContent[];
  codeExample?: string;
  completed?: boolean;
}

export interface LessonContent {
  type: 'text' | 'code' | 'image' | 'quiz';
  content: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  lessonId?: string;
  completed?: boolean;
  score?: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'code-output';
  options: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  requirements: string[];
  completed?: boolean;
}

export interface GlossaryItem {
  term: string;
  definition: string;
  example?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  progress: {
    completedLessons: string[];
    completedQuizzes: string[];
    completedProjects: string[];
    streakDays: number;
    lastActive: string;
    totalPoints: number;
  };
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}