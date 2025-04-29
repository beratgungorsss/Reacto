import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { LessonCard } from '@/components/lessons/LessonCard';
import { colors } from '@/constants/colors';
import { lessons } from '@/data/lessons';
import { useProgressStore } from '@/store/progress-store';

export const ContinueLearningSection = () => {
  const router = useRouter();
  const { completedLessons } = useProgressStore();
  
  // Find the first incomplete lesson
  const nextLesson = lessons.find(lesson => !completedLessons.includes(lesson.id));
  
  // Get the last 2 completed lessons
  const recentCompletedLessons = lessons
    .filter(lesson => completedLessons.includes(lesson.id))
    .slice(0, 2);
  
  const handleSeeAllPress = () => {
    router.push('/lessons');
  };
  
  if (!nextLesson && recentCompletedLessons.length === 0) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Öğrenmeye Devam Et</Text>
        <Button 
          title="Tümünü Gör" 
          variant="text" 
          size="small"
          onPress={handleSeeAllPress}
          textStyle={styles.seeAllText}
          style={styles.seeAllButton}
        />
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {nextLesson && (
          <View style={styles.nextLessonContainer}>
            <Text style={styles.nextLessonLabel}>Sıradaki Ders</Text>
            <LessonCard lesson={nextLesson} />
          </View>
        )}
        
        {recentCompletedLessons.map(lesson => (
          <LessonCard 
            key={lesson.id} 
            lesson={lesson} 
            isCompleted={true} 
          />
        ))}
        
        <View style={styles.seeMoreContainer}>
          <View style={styles.seeMoreCircle}>
            <ArrowRight size={24} color={colors.primary} />
          </View>
          <Text style={styles.seeMoreText}>Daha Fazla Ders</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  seeAllButton: {
    paddingHorizontal: 0,
  },
  seeAllText: {
    color: colors.primary,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 32,
    paddingBottom: 8,
  },
  nextLessonContainer: {
    marginBottom: 8,
  },
  nextLessonLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 4,
    marginLeft: 4,
  },
  seeMoreContainer: {
    width: 120,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  seeMoreCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeMoreText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});