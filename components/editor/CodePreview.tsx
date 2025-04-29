import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { colors } from '@/constants/colors';

interface CodePreviewProps {
  code: string;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // This is a very simple "preview" that just shows what the code would do
      // In a real implementation, you would use a more sophisticated approach
      // to actually render React Native components
      
      // For now, we'll just do a basic syntax check and show the code
      // with some formatting
      
      // Check for basic syntax errors
      new Function(code); // This will throw if there's a syntax error
      
      // Format the output
      const formattedOutput = formatOutput(code);
      setOutput(formattedOutput);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      setOutput('');
    }
  }, [code]);

  const formatOutput = (code: string): string => {
    // This is a very simple formatter
    // In a real implementation, you would use a proper parser
    
    // Remove comments
    const withoutComments = code.replace(/\/\/.*$/gm, '');
    
    // Highlight JSX
    const highlighted = withoutComments
      .replace(/<([A-Za-z0-9]+)/g, '<span style="color: #61dafb">&lt;$1</span>')
      .replace(/\/>/g, '<span style="color: #61dafb">/&gt;</span>')
      .replace(/<\/([A-Za-z0-9]+)>/g, '<span style="color: #61dafb">&lt;/$1&gt;</span>');
    
    return highlighted;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Önizleme</Text>
      </View>
      
      <ScrollView style={styles.outputContainer}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Hata:</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <Text style={styles.previewText}>
              {output ? 'Kod başarıyla derlendi!' : 'Kod çalıştırıldığında burada önizleme görünecek.'}
            </Text>
            <Text style={styles.noteText}>
              Not: Gerçek bir önizleme için, kodunuzu bir React Native projesinde test etmeniz gerekir.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  outputContainer: {
    maxHeight: 200,
    padding: 12,
  },
  errorContainer: {
    backgroundColor: `${colors.error}10`,
    padding: 12,
    borderRadius: 6,
  },
  errorTitle: {
    color: colors.error,
    fontWeight: '600',
    marginBottom: 4,
  },
  errorText: {
    color: colors.error,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
  },
  previewContainer: {
    padding: 8,
  },
  previewText: {
    color: colors.success,
    marginBottom: 8,
  },
  noteText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
  },
});