import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { colors } from '@/constants/colors';
import { projects } from '@/data/projects';
import { useProgressStore } from '@/store/progress-store';

export default function ProjectsScreen() {
  const { completedProjects } = useProgressStore();
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Projeler',
          headerLargeTitle: true,
        }} 
      />
      
      <View style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectCard 
              project={item} 
              isCompleted={completedProjects.includes(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Öğrendiklerinizi pekiştirmek için gerçek dünya projeleri
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