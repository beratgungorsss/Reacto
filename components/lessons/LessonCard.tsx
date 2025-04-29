import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Book, CheckCircle } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { colors } from '@/constants/colors';
import { Lesson } from '@/types';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  isCompleted = false 
}) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/lessons/${lesson.id}`);
  };
  
  const getLevelVariant = () => {
    switch (lesson.level) {
      case 'beginner':
        return 'info';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'info';
    }
  };
  
  const getLevelLabel = () => {
    switch (lesson.level) {
      case 'beginner':
        return 'Başlangıç';
      case 'intermediate':
        return 'Orta';
      case 'advanced':
        return 'İleri';
      default:
        return 'Başlangıç';
    }
  };
  
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Book size={24} color={colors.primary} />
          </View>
          <Badge 
            label={getLevelLabel()} 
            variant={getLevelVariant()} 
            size="small" 
          />
        </View>
        
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.description}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.duration}>{lesson.duration} dakika</Text>
          {isCompleted && (
            <View style={styles.completedContainer}>
              <CheckCircle size={16} color={colors.success} />
              <Text style={styles.completedText}>Tamamlandı</Text>
            </View>
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
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
  },
});