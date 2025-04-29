// Collection of code examples for different lessons
export const codeExamples: Record<string, string> = {
  // Basic React Native component
  '1': `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HelloWorld() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Merhaba React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});`,

  // Component with props
  '2': `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Props ile çalışan bir component
export default function Greeting({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Merhaba, {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});`,

  // Component with state
  '3': `import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter() {
  // useState hook'u ile state tanımlama
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Button title="Artır" onPress={() => setCount(count + 1)} />
      <Button title="Azalt" onPress={() => setCount(count - 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  count: {
    fontSize: 48,
    marginBottom: 20,
  },
});`,

  // Navigation example
  '4': `import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Sayfa</Text>
      <Button
        title="Detay Sayfasına Git"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});`,

  // API fetch example
  '5': `import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Component mount olduğunda veri çek
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError('Veri çekilirken bir hata oluştu');
      setLoading(false);
    }
  };

  if (loading) return <Text>Yükleniyor...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
};