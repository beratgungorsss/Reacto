import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, CheckCircle, Code } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { lessons } from '@/data/lessons';
import { useProgressStore } from '@/store/progress-store';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { CodePreview } from '@/components/editor/CodePreview';
import { codeExamples } from '@/components/editor/CodeExamples';

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completeLesson, completedLessons } = useProgressStore();
  
  const lesson = lessons.find(l => l.id === id);
  const isCompleted = completedLessons.includes(id || '');
  
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  // Get the initial code example for this lesson
  useEffect(() => {
    if (id && codeExamples[id]) {
      setCurrentCode(codeExamples[id]);
    }
  }, [id]);
  
  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ders bulunamadı</Text>
        <Button 
          title="Geri Dön" 
          onPress={() => router.back()} 
          style={styles.backButton}
        />
      </View>
    );
  }
  
  const currentContent = lesson.content[currentContentIndex];
  const isLastContent = currentContentIndex === lesson.content.length - 1;
  
  const handleNext = () => {
    if (currentContentIndex < lesson.content.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    } else {
      // If we're at the last content, show the code editor
      setShowCodeEditor(true);
    }
  };
  
  const handlePrevious = () => {
    if (showCodeEditor) {
      setShowCodeEditor(false);
    } else if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };
  
  const handleComplete = () => {
    completeLesson(lesson.id);
    router.back();
  };
  
  const handleRunCode = (code: string) => {
    setCurrentCode(code);
    setShowPreview(true);
  };
  
  const renderContent = () => {
    switch (currentContent.type) {
      case 'text':
        return (
          <Text style={styles.contentText}>
            {currentContent.content}
          </Text>
        );
      case 'code':
        return (
          <Card variant="filled" style={styles.codeCard}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
            >
              <Text style={styles.codeText}>
                {currentContent.content}
              </Text>
            </ScrollView>
          </Card>
        );
      case 'image':
        return (
          <View style={styles.imageContainer}>
            <Text>Image placeholder</Text>
          </View>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: lesson.title,
          headerBackTitle: 'Dersler',
        }} 
      />
      
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          {lesson.content.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.progressDot,
                index <= currentContentIndex && !showCodeEditor ? styles.progressDotActive : {}
              ]} 
            />
          ))}
          <View 
            style={[
              styles.progressDot,
              showCodeEditor ? styles.progressDotActive : {}
            ]} 
          />
        </View>
        
        <ScrollView 
          style={styles.contentContainer}
          contentContainerStyle={styles.contentScroll}
        >
          {showCodeEditor ? (
            <View style={styles.editorContainer}>
              <View style={styles.editorHeader}>
                <Text style={styles.editorTitle}>Pratik Yap</Text>
                <Text style={styles.editorSubtitle}>
                  Öğrendiklerinizi pekiştirmek için kod yazın ve çalıştırın
                </Text>
              </View>
              
              <CodeEditor 
                initialCode={codeExamples[id || '1'] || ''}
                lessonId={id || '1'}
                onRun={handleRunCode}
              />
              
              {showPreview && (
                <CodePreview code={currentCode} />
              )}
            </View>
          ) : (
            renderContent()
          )}
        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.navButton, 
              currentContentIndex === 0 && !showCodeEditor ? styles.navButtonDisabled : {}
            ]}
            onPress={handlePrevious}
            disabled={currentContentIndex === 0 && !showCodeEditor}
          >
            <ArrowLeft 
              size={20} 
              color={currentContentIndex === 0 && !showCodeEditor ? colors.textSecondary : colors.primary} 
            />
            <Text 
              style={[
                styles.navButtonText,
                currentContentIndex === 0 && !showCodeEditor ? styles.navButtonTextDisabled : {}
              ]}
            >
              Önceki
            </Text>
          </TouchableOpacity>
          
          {isLastContent && showCodeEditor ? (
            <Button 
              title={isCompleted ? "Tamamlandı" : "Dersi Tamamla"} 
              onPress={handleComplete}
              style={styles.completeButton}
              variant={isCompleted ? "outline" : "primary"}
              disabled={isCompleted}
            />
          ) : (
            <TouchableOpacity 
              style={styles.navButton}
              onPress={handleNext}
            >
              <Text style={styles.navButtonText}>
                {isLastContent ? "Pratik Yap" : "Sonraki"}
              </Text>
              {isLastContent ? (
                <Code size={20} color={colors.primary} />
              ) : (
                <ArrowRight size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
  },
  contentContainer: {
    flex: 1,
  },
  contentScroll: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  codeCard: {
    backgroundColor: '#1E1E1E',
    marginVertical: 16,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#fff',
    padding: 8,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginVertical: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: colors.primary,
    marginHorizontal: 4,
  },
  navButtonTextDisabled: {
    color: colors.textSecondary,
  },
  completeButton: {
    paddingHorizontal: 24,
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
  editorContainer: {
    marginBottom: 16,
  },
  editorHeader: {
    marginBottom: 16,
  },
  editorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  editorSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});