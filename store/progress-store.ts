import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessons } from '@/data/lessons';
import { quizzes } from '@/data/quizzes';
import { projects } from '@/data/projects';

interface ProgressState {
  completedLessons: string[];
  completedQuizzes: Record<string, number>; // quizId -> score
  completedProjects: string[];
  streakDays: number;
  lastActive: string;
  totalPoints: number;
  
  // Actions
  completeLesson: (lessonId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  completeProject: (projectId: string) => void;
  updateStreak: () => void;
  
  // Getters
  getLessonProgress: () => number;
  getQuizProgress: () => number;
  getProjectProgress: () => number;
  getTotalProgress: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      completedQuizzes: {},
      completedProjects: [],
      streakDays: 0,
      lastActive: new Date().toISOString(),
      totalPoints: 0,
      
      completeLesson: (lessonId: string) => {
        const { completedLessons, totalPoints } = get();
        
        if (!completedLessons.includes(lessonId)) {
          set({
            completedLessons: [...completedLessons, lessonId],
            totalPoints: totalPoints + 10, // 10 points per lesson
          });
        }
      },
      
      completeQuiz: (quizId: string, score: number) => {
        const { completedQuizzes, totalPoints } = get();
        const currentScore = completedQuizzes[quizId] || 0;
        
        // Only update if new score is higher
        if (score > currentScore) {
          const pointsToAdd = score > currentScore ? (score - currentScore) * 5 : 0;
          
          set({
            completedQuizzes: {
              ...completedQuizzes,
              [quizId]: score,
            },
            totalPoints: totalPoints + pointsToAdd,
          });
        }
      },
      
      completeProject: (projectId: string) => {
        const { completedProjects, totalPoints } = get();
        
        if (!completedProjects.includes(projectId)) {
          set({
            completedProjects: [...completedProjects, projectId],
            totalPoints: totalPoints + 50, // 50 points per project
          });
        }
      },
      
      updateStreak: () => {
        const { lastActive, streakDays } = get();
        const today = new Date();
        const lastActiveDate = new Date(lastActive);
        
        // Reset time part to compare dates only
        today.setHours(0, 0, 0, 0);
        lastActiveDate.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(today.getTime() - lastActiveDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let newStreakDays = streakDays;
        
        if (diffDays === 1) {
          // Consecutive day
          newStreakDays += 1;
        } else if (diffDays > 1) {
          // Streak broken
          newStreakDays = 1;
        }
        // If diffDays === 0, it's the same day, don't change streak
        
        set({
          streakDays: newStreakDays,
          lastActive: today.toISOString(),
        });
      },
      
      getLessonProgress: () => {
        const { completedLessons } = get();
        return (completedLessons.length / lessons.length) * 100;
      },
      
      getQuizProgress: () => {
        const { completedQuizzes } = get();
        return (Object.keys(completedQuizzes).length / quizzes.length) * 100;
      },
      
      getProjectProgress: () => {
        const { completedProjects } = get();
        return (completedProjects.length / projects.length) * 100;
      },
      
      getTotalProgress: () => {
        const lessonWeight = 0.4;
        const quizWeight = 0.3;
        const projectWeight = 0.3;
        
        const lessonProgress = get().getLessonProgress();
        const quizProgress = get().getQuizProgress();
        const projectProgress = get().getProjectProgress();
        
        return (
          lessonProgress * lessonWeight +
          quizProgress * quizWeight +
          projectProgress * projectWeight
        );
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);