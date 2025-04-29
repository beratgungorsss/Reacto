import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LogOut, Award, Settings, BookOpen, Code } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { lessons } from '@/data/lessons';
import { quizzes } from '@/data/quizzes';
import { projects } from '@/data/projects';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { 
    getLessonProgress, 
    getQuizProgress, 
    getProjectProgress,
    getTotalProgress,
    totalPoints,
    streakDays,
    completedLessons,
    completedQuizzes,
    completedProjects
  } = useProgressStore();
  
  const handleLogout = () => {
    Alert.alert(
      "Bilgi",
      "Giriş sistemi devre dışı bırakılmıştır. Tüm kullanıcılar otomatik olarak giriş yapmış sayılmaktadır.",
      [
        { 
          text: "Tamam", 
          style: "default"
        }
      ]
    );
  };
  
  const handleGlossaryPress = () => {
    router.push('/glossary');
  };
  
  const handleProjectsPress = () => {
    router.push('/projects');
  };
  
  const handleSettingsPress = () => {
    router.push('/settings');
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Profil',
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '700',
          },
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <LogOut size={20} color={colors.error} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0) || "D"}
            </Text>
          </View>
          <Text style={styles.nameText}>{user?.name || "Demo Kullanıcı"}</Text>
          <Text style={styles.emailText}>{user?.email || "demo@example.com"}</Text>
        </View>
        
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalPoints}</Text>
              <Text style={styles.statLabel}>Toplam Puan</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{streakDays}</Text>
              <Text style={styles.statLabel}>Gün Serisi</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.round(getTotalProgress())}%
              </Text>
              <Text style={styles.statLabel}>Tamamlandı</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.progressCard}>
          <Text style={styles.cardTitle}>Öğrenme İlerlemesi</Text>
          
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Dersler</Text>
              <Text style={styles.progressCount}>
                {completedLessons.length} / {lessons.length}
              </Text>
            </View>
            <ProgressBar 
              progress={getLessonProgress()} 
              height={8} 
              color={colors.primary}
            />
          </View>
          
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Quizler</Text>
              <Text style={styles.progressCount}>
                {Object.keys(completedQuizzes).length} / {quizzes.length}
              </Text>
            </View>
            <ProgressBar 
              progress={getQuizProgress()} 
              height={8} 
              color={colors.secondary}
            />
          </View>
          
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Projeler</Text>
              <Text style={styles.progressCount}>
                {completedProjects.length} / {projects.length}
              </Text>
            </View>
            <ProgressBar 
              progress={getProjectProgress()} 
              height={8} 
              color={colors.primaryLight}
            />
          </View>
        </Card>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleGlossaryPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: `${colors.secondaryLight}20` }]}>
              <BookOpen size={24} color={colors.secondaryLight} />
            </View>
            <Text style={styles.actionText}>Sözlük</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleProjectsPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: `${colors.primaryLight}20` }]}>
              <Code size={24} color={colors.primaryLight} />
            </View>
            <Text style={styles.actionText}>Projeler</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSettingsPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: `${colors.textSecondary}20` }]}>
              <Settings size={24} color={colors.textSecondary} />
            </View>
            <Text style={styles.actionText}>Ayarlar</Text>
          </TouchableOpacity>
        </View>
        
        <Button 
          title="Bilgi" 
          variant="outline" 
          style={styles.logoutButtonFull}
          textStyle={{ color: colors.primary }}
          onPress={handleLogout}
        />
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
  logoutButton: {
    padding: 8,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  progressCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  progressCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: colors.text,
  },
  logoutButtonFull: {
    borderColor: colors.primary,
  },
});