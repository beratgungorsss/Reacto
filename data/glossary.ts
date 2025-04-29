import { GlossaryItem } from '@/types';

export const glossaryItems: GlossaryItem[] = [
  {
    term: 'Component',
    definition: 'React Native uygulamalarının yapı taşlarıdır. UI\'ın bağımsız, yeniden kullanılabilir parçalarını tanımlar.',
    example: 'Button, Text, View, ScrollView vb.'
  },
  {
    term: 'Props',
    definition: 'Properties\'in kısaltması. Bir component\'e dışarıdan geçirilen ve component içinde değiştirilemeyen verilerdir.',
    example: '<Button title="Tıkla" color="blue" />'
  },
  {
    term: 'State',
    definition: 'Component\'in kendi içinde tuttuğu ve değişebilen verilerdir. State değiştiğinde component yeniden render edilir.',
    example: 'const [count, setCount] = useState(0);'
  },
  {
    term: 'Hook',
    definition: 'Function component\'lerde state ve diğer React özelliklerini kullanmayı sağlayan fonksiyonlardır.',
    example: 'useState, useEffect, useContext, useRef vb.'
  },
  {
    term: 'JSX',
    definition: 'JavaScript XML. JavaScript içinde HTML benzeri kod yazmanızı sağlayan bir syntax uzantısıdır.',
    example: 'return <View><Text>Merhaba</Text></View>;'
  },
  {
    term: 'Virtual DOM',
    definition: 'React\'ın gerçek DOM\'un hafif bir kopyasını tutarak, değişiklikleri verimli bir şekilde uygulamasını sağlayan mekanizma.',
    example: 'React, state değiştiğinde önce Virtual DOM\'u günceller, sonra gerçek DOM\'a minimum değişiklikleri uygular.'
  },
  {
    term: 'StyleSheet',
    definition: 'React Native\'de stil tanımlamak için kullanılan API. CSS\'e benzer ancak tüm CSS özellikleri desteklenmez.',
    example: 'const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });'
  },
  {
    term: 'Flexbox',
    definition: 'React Native\'de layout düzenlemek için kullanılan ana sistem. Web\'deki CSS Flexbox\'a benzer.',
    example: 'flex, flexDirection, justifyContent, alignItems özellikleri'
  },
  {
    term: 'Navigation',
    definition: 'React Native uygulamalarında ekranlar arası geçişi yönetme sistemi.',
    example: 'Stack Navigator, Tab Navigator, Drawer Navigator'
  },
  {
    term: 'Expo',
    definition: 'React Native uygulamaları geliştirmeyi kolaylaştıran bir platform ve araç seti.',
    example: 'Expo CLI, Expo Go, EAS Build'
  }
];