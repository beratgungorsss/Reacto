import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert
} from 'react-native';
import { Stack } from 'expo-router';
import { 
  Moon, 
  Bell, 
  Globe, 
  HelpCircle, 
  Mail, 
  Shield, 
  Trash2 
} from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would update the theme here
  };
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };
  
  const handleClearData = () => {
    Alert.alert(
      "Verileri Temizle",
      "Tüm ilerleme verileriniz silinecek. Bu işlem geri alınamaz.",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        { 
          text: "Temizle", 
          onPress: () => {
            // In a real app, you would clear the progress data here
            Alert.alert("Başarılı", "Tüm veriler temizlendi.");
          },
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Ayarlar',
          headerLargeTitle: true,
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Görünüm</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.iconContainer}>
                <Moon size={20} color={colors.text} />
              </View>
              <Text style={styles.settingText}>Karanlık Mod</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: `${colors.primary}80` }}
              thumbColor={isDarkMode ? colors.primary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirimler</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.iconContainer}>
                <Bell size={20} color={colors.text} />
              </View>
              <Text style={styles.settingText}>Bildirimler</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.border, true: `${colors.primary}80` }}
              thumbColor={notificationsEnabled ? colors.primary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dil</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.iconContainer}>
                <Globe size={20} color={colors.text} />
              </View>
              <Text style={styles.settingText}>Uygulama Dili</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>Türkçe</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destek</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.iconContainer}>
                <HelpCircle size={20} color={colors.text} />
              </View>
              <Text style={styles.settingText}>Yardım Merkezi</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.iconContainer}>
                <Mail size={20} color={colors.text} />
              </View>
              <Text style={styles.settingText}>Geri Bildirim Gönder</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gizlilik</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.iconContainer}>
                <Shield size={20} color={colors.text} />
              </View>
              <Text style={styles.settingText}>Gizlilik Politikası</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleClearData}
          >
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: `${colors.error}20` }]}>
                <Trash2 size={20} color={colors.error} />
              </View>
              <Text style={[styles.settingText, { color: colors.error }]}>
                Tüm Verileri Temizle
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>Reacto v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2023 Reacto. Tüm hakları saklıdır.</Text>
        </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.textSecondary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
  },
  valueContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  valueText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});