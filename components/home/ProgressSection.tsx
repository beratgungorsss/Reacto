import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { useProgressStore } from '@/store/progress-store';

export const ProgressSection = () => {
  const { 
    getLessonProgress, 
    getQuizProgress, 
    getProjectProgress,
    getTotalProgress,
    streakDays
  } = useProgressStore();
  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Gelişim Takibi</Text>
      
      <Card style={styles.progressCard}>
        <View style={styles.totalProgressContainer}>
          <Text style={styles.totalProgressLabel}>Genel İlerleme</Text>
          <Text style={styles.totalProgressValue}>
            {Math.round(getTotalProgress())}%
          </Text>
        </View>
        
        <ProgressBar 
          progress={getTotalProgress()} 
          height={10} 
          color={colors.primary}
          style={styles.totalProgressBar}
        />
        
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>
            {streakDays} günlük öğrenme serisi! 🔥
          </Text>
        </View>
        
        <View style={styles.detailedProgressContainer}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Dersler</Text>
            <ProgressBar 
              progress={getLessonProgress()} 
              height={6} 
              color={colors.primary}
              showPercentage
            />
          </View>
          
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Quizler</Text>
            <ProgressBar 
              progress={getQuizProgress()} 
              height={6} 
              color={colors.secondary}
              showPercentage
            />
          </View>
          
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Projeler</Text>
            <ProgressBar 
              progress={getProjectProgress()} 
              height={6} 
              color={colors.primaryLight}
              showPercentage
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  progressCard: {
    marginHorizontal: 16,
  },
  totalProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalProgressLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  totalProgressValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  totalProgressBar: {
    marginBottom: 16,
  },
  streakContainer: {
    backgroundColor: `${colors.primary}15`,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    textAlign: 'center',
  },
  detailedProgressContainer: {
    gap: 12,
  },
  progressItem: {
    gap: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});