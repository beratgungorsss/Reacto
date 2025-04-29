import { Quiz } from '@/types';

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'React Native Temelleri',
    description: 'React Native\'in temel kavramlarını test edin',
    lessonId: '1',
    questions: [
      {
        id: '1-1',
        text: 'React Native nedir?',
        type: 'multiple-choice',
        options: [
          'Sadece iOS için native uygulama geliştirme platformu',
          'Sadece Android için native uygulama geliştirme platformu',
          'JavaScript kullanarak cross-platform mobil uygulama geliştirme framework\'ü',
          'Swift ile iOS uygulamaları geliştirme platformu'
        ],
        correctAnswer: 2,
        explanation: 'React Native, JavaScript ve React kullanarak hem iOS hem de Android platformları için native mobil uygulamalar geliştirmenizi sağlayan bir framework\'tür.'
      },
      {
        id: '1-2',
        text: 'Aşağıdakilerden hangisi React Native\'in temel bir bileşenidir?',
        type: 'multiple-choice',
        options: [
          'Div',
          'View',
          'Container',
          'Section'
        ],
        correctAnswer: 1,
        explanation: 'View, React Native\'de temel bir container bileşenidir. HTML\'deki div etiketine benzer bir işlev görür.'
      },
      {
        id: '1-3',
        text: 'Aşağıdaki kodun çıktısı nedir?\n\nconst x = 5;\nconst y = "10";\nconsole.log(x + y);',
        type: 'code-output',
        options: [
          '15',
          '"510"',
          'Error',
          'undefined'
        ],
        correctAnswer: 1,
        explanation: 'JavaScript\'te bir sayı ve string toplanırsa, sayı string\'e dönüştürülür ve iki string birleştirilir. Bu nedenle sonuç "510" olur.'
      }
    ]
  },
  {
    id: '2',
    title: 'Component\'ler ve Props',
    description: 'React Native component\'leri ve props kavramını test edin',
    lessonId: '2',
    questions: [
      {
        id: '2-1',
        text: 'Props nedir?',
        type: 'multiple-choice',
        options: [
          'Component\'in kendi içinde değiştirebileceği veriler',
          'Parent component\'ten child component\'e aktarılan değişmez veriler',
          'Component\'in yaşam döngüsü metodları',
          'React Native\'in stil özellikleri'
        ],
        correctAnswer: 1,
        explanation: 'Props (Properties), parent component\'ten child component\'e aktarılan ve child component tarafından değiştirilemeyen verilerdir.'
      },
      {
        id: '2-2',
        text: 'Aşağıdakilerden hangisi doğru bir props kullanımıdır?',
        type: 'multiple-choice',
        options: [
          '<Button props={color: "blue"} />',
          '<Button color="blue" />',
          '<Button props.color="blue" />',
          '<Button this.props.color="blue" />'
        ],
        correctAnswer: 1,
        explanation: 'Props, HTML attribute\'ları gibi doğrudan component\'e verilir. Doğru kullanım <Button color="blue" /> şeklindedir.'
      }
    ]
  },
  {
    id: '3',
    title: 'State Yönetimi',
    description: 'React Native\'de state yönetimini test edin',
    lessonId: '3',
    questions: [
      {
        id: '3-1',
        text: 'useState hook\'u ne işe yarar?',
        type: 'multiple-choice',
        options: [
          'Component\'e props geçirmek için kullanılır',
          'Component\'in yaşam döngüsünü yönetmek için kullanılır',
          'Function component\'lerde state tanımlamak için kullanılır',
          'API çağrıları yapmak için kullanılır'
        ],
        correctAnswer: 2,
        explanation: 'useState hook\'u, function component\'lerde state tanımlamak ve yönetmek için kullanılır.'
      },
      {
        id: '3-2',
        text: 'Aşağıdaki kodun çıktısı nedir?\n\nconst [count, setCount] = useState(0);\nsetCount(count + 1);\nsetCount(count + 1);\nconsole.log(count);',
        type: 'code-output',
        options: [
          '0',
          '1',
          '2',
          'undefined'
        ],
        correctAnswer: 0,
        explanation: 'State güncellemeleri asenkrondur ve hemen gerçekleşmez. setCount çağrıldıktan hemen sonra count değeri hala 0 olacaktır. Bir sonraki render\'da güncellenecektir.'
      }
    ]
  }
];