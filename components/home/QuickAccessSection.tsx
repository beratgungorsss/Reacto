import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Book, HelpCircle, Code, BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface QuickAccessItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
  color: string;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({
  icon,
  title,
  description,
  onPress,
  color,
}) => (
  <TouchableOpacity 
    style={[styles.itemContainer, { borderLeftColor: color }]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
      {icon}
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

export const QuickAccessSection = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
      
      <View style={styles.grid}>
        <QuickAccessItem 
          icon={<Book size={24} color={colors.primary} />}
          title="Dersler"
          description="React Native temellerini öğren"
          onPress={() => router.push('/lessons')}
          color={colors.primary}
        />
        
        <QuickAccessItem 
          icon={<HelpCircle size={24} color={colors.secondary} />}
          title="Quizler"
          description="Bilgilerini test et"
          onPress={() => router.push('/quiz')}
          color={colors.secondary}
        />
        
        <QuickAccessItem 
          icon={<Code size={24} color={colors.primaryLight} />}
          title="Projeler"
          description="Gerçek uygulamalar geliştir"
          onPress={() => router.push('/projects')}
          color={colors.primaryLight}
        />
        
        <QuickAccessItem 
          icon={<BookOpen size={24} color={colors.secondaryLight} />}
          title="Sözlük"
          description="Terimleri öğren"
          onPress={() => router.push('/glossary')}
          color={colors.secondaryLight}
        />
      </View>
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
  grid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});