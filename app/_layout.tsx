import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Add custom fonts here if needed
  });
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  
  if (!loaded) return null;
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="lessons/[id]" 
        options={{ 
          headerShown: true,
          headerBackTitle: 'Dersler',
        }} 
      />
      <Stack.Screen 
        name="quiz/[id]" 
        options={{ 
          headerShown: true,
          headerBackTitle: 'Quizler',
        }} 
      />
      <Stack.Screen 
        name="projects/[id]" 
        options={{ 
          headerShown: true,
          headerBackTitle: 'Projeler',
        }} 
      />
      <Stack.Screen 
        name="glossary/index" 
        options={{ 
          headerShown: true,
          title: 'Sözlük',
        }} 
      />
      <Stack.Screen 
        name="projects/index" 
        options={{ 
          headerShown: true,
          title: 'Projeler',
        }} 
      />
      <Stack.Screen 
        name="settings/index" 
        options={{ 
          headerShown: true,
          title: 'Ayarlar',
        }} 
      />
    </Stack>
  );
}