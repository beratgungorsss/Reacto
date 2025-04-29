import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { LessonCard } from '@/components/lessons/LessonCard';
import { colors } from '@/constants/colors';
import { lessons } from '@/data/lessons';
import { useProgressStore } from '@/store/progress-store';

export default function LessonsScreen() {
  const { completedLessons } = useProgressStore();
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Dersler',
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
          data={lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LessonCard 
              lesson={item} 
              isCompleted={completedLessons.includes(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerText}>
                React Native öğrenmek için adım adım dersler
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