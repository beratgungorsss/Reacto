import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';

export default function AuthScreen() {
  const router = useRouter();
  const { login, register, isLoading } = useAuthStore();
  
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleAuth = async () => {
    try {
      setError('');
      
      // Basic validation
      if (!email) {
        setError('Lütfen e-posta adresinizi girin');
        return;
      }
      
      if (!password) {
        setError('Lütfen şifrenizi girin');
        return;
      }
      
      if (isLogin) {
        await login(email, password);
        router.replace('/');
      } else {
        if (!name) {
          setError('Lütfen adınızı girin');
          return;
        }
        await register(name, email, password);
        router.replace('/');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Giriş yapılırken bir hata oluştu';
      setError(errorMessage);
      Alert.alert(
        isLogin ? "Giriş Başarısız" : "Kayıt Başarısız",
        errorMessage
      );
    }
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: '',
          headerShown: false,
        }} 
      />
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>R</Text>
            </View>
            <Text style={styles.title}>Reacto</Text>
            <Text style={styles.subtitle}>
              React Native öğrenmek hiç bu kadar kolay olmamıştı
            </Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </Text>
            
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ad Soyad</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Adınızı girin"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-posta</Text>
              <TextInput
                style={styles.input}
                placeholder="E-posta adresinizi girin"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <TextInput
                style={styles.input}
                placeholder="Şifrenizi girin"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <Button
              title={isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
              onPress={handleAuth}
              isLoading={isLoading}
              style={styles.authButton}
            />
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode}>
                <Text style={styles.switchButton}>
                  {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                </Text>
              </TouchableOpacity>
            </View>
            
            {isLogin && (
              <TouchableOpacity 
                style={styles.demoButton}
                onPress={() => {
                  setEmail('demo@example.com');
                  setPassword('password');
                }}
              >
                <Text style={styles.demoButtonText}>
                  Demo hesabı kullan
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
  formContainer: {
    width: '100%',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorText: {
    color: colors.error,
    marginBottom: 16,
  },
  authButton: {
    marginTop: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  switchText: {
    color: colors.textSecondary,
  },
  switchButton: {
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  demoButton: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 8,
  },
  demoButtonText: {
    color: colors.primary,
    fontWeight: '500',
  },
});