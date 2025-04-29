import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { HelpCircle, CheckCircle } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { Quiz } from '@/types';

interface QuizCardProps {
  quiz: Quiz;
  isCompleted?: boolean;
  score?: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({ 
  quiz, 
  isCompleted = false,
  score = 0
}) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/quiz/${quiz.id}`);
  };
  
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <HelpCircle size={24} color={colors.secondary} />
          </View>
          <Text style={styles.questionCount}>
            {quiz.questions.length} Soru
          </Text>
        </View>
        
        <Text style={styles.title}>{quiz.title}</Text>
        <Text style={styles.description}>{quiz.description}</Text>
        
        <View style={styles.footer}>
          {isCompleted ? (
            <View style={styles.scoreContainer}>
              <CheckCircle size={16} color={colors.success} />
              <Text style={styles.scoreText}>
                Skor: {score}/{quiz.questions.length}
              </Text>
            </View>
          ) : (
            <Text style={styles.notCompletedText}>Henüz tamamlanmadı</Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.secondary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionCount: {
    fontSize: 12,
    color: colors.textSecondary,
    backgroundColor: colors.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '500',
  },
  notCompletedText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});