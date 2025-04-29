import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle, Code, ExternalLink } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { colors } from '@/constants/colors';
import { projects } from '@/data/projects';
import { useProgressStore } from '@/store/progress-store';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completeProject, completedProjects } = useProgressStore();
  
  const project = projects.find(p => p.id === id);
  const isCompleted = completedProjects.includes(id || '');
  
  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Proje bulunamadı</Text>
        <Button 
          title="Geri Dön" 
          onPress={() => router.back()} 
          style={styles.backButton}
        />
      </View>
    );
  }
  
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
  
  const handleCompleteProject = () => {
    if (isCompleted) {
      return;
    }
    
    Alert.alert(
      "Projeyi Tamamla",
      "Bu projeyi tamamladığınızı onaylıyor musunuz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        { 
          text: "Tamamla", 
          onPress: () => {
            completeProject(project.id);
          }
        }
      ]
    );
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: project.title,
          headerBackTitle: 'Projeler',
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{project.title}</Text>
            <Badge 
              label={getLevelLabel()} 
              variant={getLevelVariant()} 
              size="small" 
            />
          </View>
          
          <Text style={styles.description}>{project.description}</Text>
        </View>
        
        <Card style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>Proje Gereksinimleri</Text>
          
          {project.requirements.map((requirement, index) => (
            <View key={index} style={styles.requirementItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.requirementText}>{requirement}</Text>
            </View>
          ))}
        </Card>
        
        <Card style={styles.resourcesCard}>
          <Text style={styles.resourcesTitle}>Faydalı Kaynaklar</Text>
          
          <TouchableOpacity style={styles.resourceItem}>
            <Text style={styles.resourceText}>React Native Dokümantasyon</Text>
            <ExternalLink size={16} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceItem}>
            <Text style={styles.resourceText}>GitHub Örnek Projeler</Text>
            <ExternalLink size={16} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceItem}>
            <Text style={styles.resourceText}>UI Tasarım İpuçları</Text>
            <ExternalLink size={16} color={colors.primary} />
          </TouchableOpacity>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Kod Editörünü Aç" 
            variant="outline"
            style={styles.codeButton}
            textStyle={{ color: colors.primaryLight }}
          />
          
          <Button 
            title={isCompleted ? "Tamamlandı" : "Projeyi Tamamla"} 
            onPress={handleCompleteProject}
            disabled={isCompleted}
            style={isCompleted ? styles.completedButton : {}}
          />
        </View>
        
        {isCompleted && (
          <View style={styles.completedContainer}>
            <CheckCircle size={20} color={colors.success} />
            <Text style={styles.completedText}>
              Bu projeyi tamamladınız ve 50 puan kazandınız!
            </Text>
          </View>
        )}
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
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  requirementsCard: {
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 12,
  },
  requirementText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  resourcesCard: {
    marginBottom: 24,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resourceText: {
    fontSize: 16,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  codeButton: {
    flex: 1,
    marginRight: 8,
    borderColor: colors.primaryLight,
  },
  completedButton: {
    backgroundColor: colors.success,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.success}15`,
    padding: 16,
    borderRadius: 8,
  },
  completedText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.success,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'center',
  },
});