import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Book, HelpCircle, User } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
        },
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="lessons/index"
        options={{
          title: 'Dersler',
          tabBarIcon: ({ color, size }) => <Book color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="quiz/index"
        options={{
          title: 'Quizler',
          tabBarIcon: ({ color, size }) => <HelpCircle color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}