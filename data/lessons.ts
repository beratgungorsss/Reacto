import { Lesson } from '@/types';

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'React Native Nedir?',
    description: 'React Native temelleri ve mobil uygulama geliştirme prensipleri',
    duration: 10,
    level: 'beginner',
    content: [
      {
        type: 'text',
        content: 'React Native, Facebook tarafından geliştirilen açık kaynaklı bir mobil uygulama framework\'üdür. JavaScript ve React kullanarak hem iOS hem de Android platformları için native mobil uygulamalar geliştirmenizi sağlar.\n\nReact Native ile yazılan kod, her platform için ayrı ayrı derlenir ve gerçek native bileşenlere dönüştürülür. Bu sayede "write once, run anywhere" prensibiyle tek bir kod tabanından birden fazla platformda çalışan uygulamalar geliştirebilirsiniz.'
      },
      {
        type: 'code',
        content: 'import React from "react";\nimport { Text, View } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>\n      <Text>Merhaba React Native!</Text>\n    </View>\n  );\n}'
      },
      {
        type: 'text',
        content: 'Yukarıdaki basit örnek, ekranın ortasında "Merhaba React Native!" yazısını gösteren bir uygulamadır. View ve Text, React Native\'in temel bileşenleridir.'
      }
    ],
  },
  {
    id: '2',
    title: 'Component Mantığı',
    description: 'React Native componentleri ve kullanımları',
    duration: 15,
    level: 'beginner',
    content: [
      {
        type: 'text',
        content: 'React Native\'de her şey bir component\'tir. Componentler, uygulamanızın UI\'ını oluşturan yapı taşlarıdır. Bir component, ekranda görüntülenecek bir öğeyi tanımlar ve kendi state\'ini yönetebilir.\n\nComponentler iki türde olabilir: Class componentler ve Function componentler. Modern React Native uygulamalarında genellikle Function componentler ve Hooks kullanılır.'
      },
      {
        type: 'code',
        content: 'import React from "react";\nimport { Text, View, StyleSheet } from "react-native";\n\n// Function Component örneği\nexport default function Greeting({ name }) {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Merhaba, {name}!</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    padding: 16,\n    backgroundColor: "#f0f0f0",\n    borderRadius: 8,\n  },\n  text: {\n    fontSize: 18,\n    color: "#333",\n  },\n});'
      }
    ],
  },
  {
    id: '3',
    title: 'State ve Props',
    description: 'Component\'lerde veri yönetimi',
    duration: 20,
    level: 'beginner',
    content: [
      {
        type: 'text',
        content: 'React Native\'de veriler iki şekilde yönetilir: Props ve State.\n\nProps (Properties): Bir component\'e dışarıdan geçirilen değişmez verilerdir. Parent component\'ten child component\'e veri aktarmak için kullanılır.\n\nState: Component\'in kendi içinde tuttuğu ve değişebilen verilerdir. State değiştiğinde component yeniden render edilir.'
      },
      {
        type: 'code',
        content: 'import React, { useState } from "react";\nimport { Text, View, Button, StyleSheet } from "react-native";\n\nexport default function Counter() {\n  // useState hook\'u ile state tanımlama\n  const [count, setCount] = useState(0);\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.count}>{count}</Text>\n      <Button title="Artır" onPress={() => setCount(count + 1)} />\n      <Button title="Azalt" onPress={() => setCount(count - 1)} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    padding: 20,\n    alignItems: "center",\n  },\n  count: {\n    fontSize: 48,\n    marginBottom: 20,\n  },\n});'
      }
    ],
  },
  {
    id: '4',
    title: 'Navigation Kullanımı',
    description: 'React Navigation ile ekranlar arası geçiş',
    duration: 25,
    level: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'React Native uygulamalarında ekranlar arası geçiş için genellikle React Navigation kütüphanesi kullanılır. Bu kütüphane, stack navigation, tab navigation, drawer navigation gibi farklı navigasyon türlerini destekler.\n\nExpo Router, React Navigation üzerine kurulu file-based bir routing sistemidir ve Next.js benzeri bir deneyim sunar.'
      },
      {
        type: 'code',
        content: '// app/_layout.tsx\nimport { Tabs } from "expo-router";\nimport { Home, Book, Award, User } from "lucide-react-native";\n\nexport default function AppLayout() {\n  return (\n    <Tabs>\n      <Tabs.Screen\n        name="index"\n        options={{\n          title: "Ana Sayfa",\n          tabBarIcon: ({ color }) => <Home color={color} size={24} />,\n        }}\n      />\n      <Tabs.Screen\n        name="lessons"\n        options={{\n          title: "Dersler",\n          tabBarIcon: ({ color }) => <Book color={color} size={24} />,\n        }}\n      />\n    </Tabs>\n  );\n}'
      }
    ],
  },
  {
    id: '5',
    title: 'API ile Veri Çekme',
    description: 'Fetch ve Axios kullanarak API\'lardan veri çekme',
    duration: 30,
    level: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'Mobil uygulamalarda genellikle uzak sunuculardan veri çekmemiz gerekir. React Native\'de fetch API veya Axios gibi kütüphaneler kullanarak HTTP istekleri yapabilirsiniz.\n\nAşağıdaki örnekte, bir API\'dan veri çekip ekranda gösterme işlemi yapılmaktadır:'
      },
      {
        type: 'code',
        content: 'import React, { useState, useEffect } from "react";\nimport { View, Text, FlatList, StyleSheet } from "react-native";\n\nexport default function UserList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    // Component mount olduğunda veri çek\n    fetchUsers();\n  }, []);\n\n  const fetchUsers = async () => {\n    try {\n      const response = await fetch("https://jsonplaceholder.typicode.com/users");\n      const data = await response.json();\n      setUsers(data);\n      setLoading(false);\n    } catch (err) {\n      setError("Veri çekilirken bir hata oluştu");\n      setLoading(false);\n    }\n  };\n\n  if (loading) return <Text>Yükleniyor...</Text>;\n  if (error) return <Text>{error}</Text>;\n\n  return (\n    <View style={styles.container}>\n      <FlatList\n        data={users}\n        keyExtractor={(item) => item.id.toString()}\n        renderItem={({ item }) => (\n          <View style={styles.userItem}>\n            <Text style={styles.userName}>{item.name}</Text>\n            <Text>{item.email}</Text>\n          </View>\n        )}\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 16,\n  },\n  userItem: {\n    padding: 16,\n    borderBottomWidth: 1,\n    borderBottomColor: "#eee",\n  },\n  userName: {\n    fontSize: 18,\n    fontWeight: "bold",\n  },\n});'
      }
    ],
  }
];