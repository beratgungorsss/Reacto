import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock user for demo purposes
const mockUser: User = {
  id: '1',
  name: 'Demo Kullanıcı',
  email: 'demo@example.com',
  progress: {
    completedLessons: [],
    completedQuizzes: [],
    completedProjects: [],
    streakDays: 0,
    lastActive: new Date().toISOString(),
    totalPoints: 0,
  },
  badges: [],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Start with a logged-in user by default
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      
      login: async (email, password) => {
        try {
          set({ isLoading: true });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Always succeed with the mock user
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      register: async (name, email, password) => {
        try {
          set({ isLoading: true });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Create a new user with the provided name and email
          const newUser: User = {
            ...mockUser,
            name,
            email,
          };
          
          set({ user: newUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        // Instead of logging out, just reset to the default mock user
        set({ user: mockUser, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);