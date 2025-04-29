import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { quizzes } from '@/data/quizzes';
import { useProgressStore } from '@/store/progress-store';

export default function QuizDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completeQuiz, completedQuizzes } = useProgressStore();
  
  const quiz = quizzes.find(q => q.id === id);
  const previousScore = completedQuizzes[id || ''] || 0;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  
  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Quiz bulunamadı</Text>
        <Button 
          title="Geri Dön" 
          onPress={() => router.back()} 
          style={styles.backButton}
        />
      </View>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const handleAnswerSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(index);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      Alert.alert('Uyarı', 'Lütfen bir cevap seçin');
      return;
    }
    
    setIsAnswerSubmitted(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz completed
      const score = correctAnswers + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      completeQuiz(quiz.id, score);
      setIsQuizCompleted(true);
    }
  };
  
  const handleFinish = () => {
    router.back();
  };
  
  const renderQuizContent = () => {
    if (isQuizCompleted) {
      const finalScore = correctAnswers + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      const percentage = Math.round((finalScore / quiz.questions.length) * 100);
      
      return (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Tamamlandı!</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              {finalScore} / {quiz.questions.length}
            </Text>
            <Text style={styles.percentageText}>
              {percentage}%
            </Text>
          </View>
          
          {previousScore > 0 && previousScore < finalScore && (
            <Text style={styles.improvedText}>
              Önceki skorunuzu geliştirdiniz! (+{finalScore - previousScore})
            </Text>
          )}
          
          <Button 
            title="Quizlere Dön" 
            onPress={handleFinish}
            style={styles.finishButton}
          />
        </View>
      );
    }
    
    return (
      <>
        <View style={styles.questionHeader}>
          <Text style={styles.questionCount}>
            Soru {currentQuestionIndex + 1}/{quiz.questions.length}
          </Text>
        </View>
        
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = index === selectedAnswer;
            
            let optionStyle = styles.optionCard;
            let textStyle = styles.optionText;
            
            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyle = {...optionStyle, ...styles.correctOption};
                textStyle = {...textStyle, ...styles.correctOptionText};
              } else if (isSelected) {
                optionStyle = {...optionStyle, ...styles.incorrectOption};
                textStyle = {...textStyle, ...styles.incorrectOptionText};
              }
            } else if (isSelected) {
              optionStyle = {...optionStyle, ...styles.selectedOption};
            }
            
            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleAnswerSelect(index)}
                disabled={isAnswerSubmitted}
                activeOpacity={0.7}
              >
                <Text style={textStyle}>{option}</Text>
                
                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle size={20} color={colors.success} style={styles.optionIcon} />
                )}
                
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle size={20} color={colors.error} style={styles.optionIcon} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        
        {isAnswerSubmitted && (
          <Card style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>
              {selectedAnswer === currentQuestion.correctAnswer 
                ? 'Doğru!' 
                : 'Yanlış!'}
            </Text>
            <Text style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
          </Card>
        )}
        
        <View style={styles.buttonContainer}>
          {!isAnswerSubmitted ? (
            <Button 
              title="Cevabı Kontrol Et" 
              onPress={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            />
          ) : (
            <Button 
              title={currentQuestionIndex < quiz.questions.length - 1 
                ? "Sonraki Soru" 
                : "Quizi Tamamla"
              } 
              onPress={handleNextQuestion}
            />
          )}
        </View>
      </>
    );
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: quiz.title,
          headerBackTitle: 'Quizler',
        }} 
      />
      
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
        >
          {renderQuizContent()}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  questionHeader: {
    marginBottom: 16,
  },
  questionCount: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  correctOption: {
    borderColor: colors.success,
    backgroundColor: `${colors.success}10`,
  },
  incorrectOption: {
    borderColor: colors.error,
    backgroundColor: `${colors.error}10`,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  correctOptionText: {
    color: colors.success,
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: colors.error,
  },
  optionIcon: {
    marginLeft: 8,
  },
  explanationCard: {
    marginBottom: 24,
    backgroundColor: colors.card,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },
  explanationText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 8,
  },
  resultContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  percentageText: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  improvedText: {
    fontSize: 16,
    color: colors.success,
    fontWeight: '500',
    marginBottom: 32,
  },
  finishButton: {
    minWidth: 200,
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