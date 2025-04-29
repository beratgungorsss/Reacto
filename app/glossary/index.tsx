import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Stack } from 'expo-router';
import { Search, X } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { glossaryItems } from '@/data/glossary';

export default function GlossaryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = glossaryItems.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'React Native Sözlük',
          headerLargeTitle: true,
        }} 
      />
      
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Terim ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.term}
          renderItem={({ item }) => (
            <Card style={styles.glossaryCard}>
              <Text style={styles.termText}>{item.term}</Text>
              <Text style={styles.definitionText}>{item.definition}</Text>
              {item.example && (
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleLabel}>Örnek:</Text>
                  <Text style={styles.exampleText}>{item.example}</Text>
                </View>
              )}
            </Card>
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                "{searchQuery}" ile ilgili sonuç bulunamadı
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  glossaryCard: {
    marginBottom: 16,
  },
  termText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  definitionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  exampleContainer: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  exampleLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});