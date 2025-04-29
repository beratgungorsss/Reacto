import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { ProgressSection } from '@/components/home/ProgressSection';
import { ContinueLearningSection } from '@/components/home/ContinueLearningSection';
import { QuickAccessSection } from '@/components/home/QuickAccessSection';
import { colors } from '@/constants/colors';
import { useProgressStore } from '@/store/progress-store';
import { useAuthStore } from '@/store/auth-store';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { updateStreak } = useProgressStore();
  
  useEffect(() => {
    // Update streak when the app is opened
    updateStreak();
  }, []);
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Reacto',
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '700',
          },
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Merhaba, <Text style={styles.nameText}>{user?.name || 'Misafir'}</Text>
          </Text>
          <Text style={styles.subtitleText}>
            React Native öğrenmeye devam edelim!
          </Text>
        </View>
        
        <ProgressSection />
        <ContinueLearningSection />
        <QuickAccessSection />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  welcomeContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  nameText: {
    color: colors.primary,
    fontWeight: '700',
  },
  subtitleText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
});