import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { colors } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@/components/ui/Button';

interface CodeEditorProps {
  initialCode?: string;
  lessonId: string;
  onRun?: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  lessonId,
  onRun,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isSaved, setIsSaved] = useState(true);

  // Load saved code when component mounts
  useEffect(() => {
    const loadSavedCode = async () => {
      try {
        const savedCode = await AsyncStorage.getItem(`code_${lessonId}`);
        if (savedCode) {
          setCode(savedCode);
        }
      } catch (error) {
        console.error('Error loading saved code:', error);
      }
    };

    loadSavedCode();
  }, [lessonId]);

  // Save code when it changes
  useEffect(() => {
    const saveCode = async () => {
      try {
        await AsyncStorage.setItem(`code_${lessonId}`, code);
        setIsSaved(true);
      } catch (error) {
        console.error('Error saving code:', error);
      }
    };

    const timeoutId = setTimeout(() => {
      saveCode();
    }, 1000); // Debounce save to avoid too many writes

    return () => clearTimeout(timeoutId);
  }, [code, lessonId]);

  const handleCodeChange = (text: string) => {
    setCode(text);
    setIsSaved(false);
  };

  const handleRun = () => {
    if (onRun) {
      onRun(code);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setIsSaved(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kod Editörü</Text>
        <Text style={styles.saveStatus}>
          {isSaved ? 'Kaydedildi ✓' : 'Kaydediliyor...'}
        </Text>
      </View>

      <ScrollView 
        horizontal 
        style={styles.editorScrollContainer}
        contentContainerStyle={styles.editorScrollContent}
      >
        <TextInput
          style={styles.codeInput}
          value={code}
          onChangeText={handleCodeChange}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          keyboardType="default"
          textAlignVertical="top"
          placeholder="// React Native kodunuzu buraya yazın"
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Çalıştır"
          onPress={handleRun}
          style={styles.runButton}
        />
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetText}>Sıfırla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#252526',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  saveStatus: {
    color: '#aaa',
    fontSize: 12,
  },
  editorScrollContainer: {
    maxHeight: 300,
  },
  editorScrollContent: {
    minWidth: '100%',
  },
  codeInput: {
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    padding: 12,
    minHeight: 200,
    minWidth: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#252526',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  runButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
  },
  resetButton: {
    padding: 8,
  },
  resetText: {
    color: '#aaa',
    fontSize: 14,
  },
});