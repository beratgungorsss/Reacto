import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'To-Do Uygulaması',
    description: 'Basit bir görev listesi uygulaması geliştirin. Görev ekleme, silme ve tamamlama işlevleri olmalı.',
    level: 'beginner',
    requirements: [
      'Görev ekleme formu',
      'Görev listesi görünümü',
      'Görevleri tamamlandı olarak işaretleme',
      'Görev silme',
      'AsyncStorage ile verileri kaydetme'
    ]
  },
  {
    id: '2',
    title: 'Film Listesi Uygulaması',
    description: 'Popüler filmleri listeleyen ve detaylarını gösteren bir uygulama geliştirin.',
    level: 'intermediate',
    requirements: [
      'Film API\'ından veri çekme',
      'Film listesi görünümü',
      'Film detay sayfası',
      'Arama işlevi',
      'Favori filmleri kaydetme'
    ]
  },
  {
    id: '3',
    title: 'Chat Uygulaması',
    description: 'Basit bir mesajlaşma uygulaması arayüzü geliştirin.',
    level: 'intermediate',
    requirements: [
      'Sohbet listesi ekranı',
      'Mesajlaşma ekranı',
      'Mesaj gönderme formu',
      'Dummy verilerle çalışan mesaj geçmişi',
      'Kullanıcı profili görünümü'
    ]
  },
  {
    id: '4',
    title: 'Hava Durumu Uygulaması',
    description: 'Konum tabanlı hava durumu bilgilerini gösteren bir uygulama geliştirin.',
    level: 'intermediate',
    requirements: [
      'Konum izni isteme ve alma',
      'Hava durumu API\'ından veri çekme',
      'Günlük hava durumu görünümü',
      'Haftalık tahmin görünümü',
      'Farklı şehirler için hava durumu arama'
    ]
  },
  {
    id: '5',
    title: 'E-Ticaret Uygulaması',
    description: 'Basit bir e-ticaret uygulaması arayüzü geliştirin.',
    level: 'advanced',
    requirements: [
      'Ürün listesi ekranı',
      'Ürün detay sayfası',
      'Alışveriş sepeti',
      'Kullanıcı profili',
      'Kategori filtreleme',
      'Ödeme ekranı tasarımı'
    ]
  }
];