import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Code, CheckCircle } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { colors } from '@/constants/colors';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  isCompleted?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isCompleted = false 
}) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/projects/${project.id}`);
  };
  
  const getLevelVariant = () => {
    switch (project.level) {
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
    switch (project.level) {
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
            <Code size={24} color={colors.primaryLight} />
          </View>
          <Badge 
            label={getLevelLabel()} 
            variant={getLevelVariant()} 
            size="small" 
          />
        </View>
        
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.description}>{project.description}</Text>
        
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Gereksinimler:</Text>
          {project.requirements.slice(0, 2).map((req, index) => (
            <Text key={index} style={styles.requirement}>
              • {req}
            </Text>
          ))}
          {project.requirements.length > 2 && (
            <Text style={styles.moreRequirements}>
              +{project.requirements.length - 2} daha...
            </Text>
          )}
        </View>
        
        {isCompleted && (
          <View style={styles.completedContainer}>
            <CheckCircle size={16} color={colors.success} />
            <Text style={styles.completedText}>Tamamlandı</Text>
          </View>
        )}
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
    backgroundColor: `${colors.primaryLight}20`,
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
  requirementsContainer: {
    marginBottom: 12,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  requirement: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  moreRequirements: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 2,
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