import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { QuizCard } from '@/components/quiz/QuizCard';
import { colors } from '@/constants/colors';
import { quizzes } from '@/data/quizzes';
import { useProgressStore } from '@/store/progress-store';

export default function QuizScreen() {
  const { completedQuizzes } = useProgressStore();
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Quizler',
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
      
      <View style={styles.container}>
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuizCard 
              quiz={item} 
              isCompleted={completedQuizzes[item.id] !== undefined}
              score={completedQuizzes[item.id] || 0}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Öğrendiklerini test et ve bilgilerini pekiştir
              </Text>
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});