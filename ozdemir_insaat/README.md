# Özdemir İnşaat - Emlak Web Sitesi

Emlakjet benzeri, kullanıcıların daireleri görüntüleyebileceği ve adminin yeni daire ekleyip yönetebileceği bir emlak tanıtım web sitesi.

## Teknolojiler

- **React** - UI framework
- **Vite** - Build tool
- **Firebase** - Backend servisleri
  - Authentication (Admin girişi)
  - Firestore (Veritabanı)
  - Storage (Resim yükleme)
- **React Router** - Sayfa yönlendirme

## Özellikler

### Kullanıcı Arayüzü
- ✅ Ana sayfa
- ✅ Daire listeleme ve detay sayfası
- ✅ Filtreleme (şehir, fiyat, oda sayısı)
- ✅ Hizmetler sayfası
- ✅ İletişim sayfası
- ✅ Responsive tasarım (mobil ve tablet uyumlu)

### Admin Paneli
- ✅ Giriş/çıkış (Firebase Authentication)
- ✅ Daire ekleme, düzenleme ve silme
- ✅ Resim yükleme (Firebase Storage)

## Kurulum

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Firebase Yapılandırması

1. [Firebase Console](https://console.firebase.google.com/) üzerinden yeni bir proje oluşturun
2. Authentication'ı aktifleştirin (Email/Password)
3. Firestore Database oluşturun
4. Storage'ı aktifleştirin
5. Web uygulaması ekleyin ve yapılandırma bilgilerini alın

`src/config/firebase.js` dosyasındaki Firebase yapılandırmasını güncelleyin:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Admin Kullanıcısı Oluşturma

Firebase Console > Authentication > Users bölümünden manuel olarak bir admin kullanıcısı ekleyin.

### 4. Firestore Kuralları

Firebase Console > Firestore Database > Rules bölümünde aşağıdaki kuralları ekleyin:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /properties/{property} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Storage Kuralları

Firebase Console > Storage > Rules bölümünde aşağıdaki kuralları ekleyin:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Geliştirme

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresini açın.

## Build

Production build oluşturmak için:

```bash
npm run build
```

Build dosyaları `dist` klasöründe oluşturulacaktır.

## Kullanım

### Kullanıcı Tarafı
1. Ana sayfadan ilanları görüntüleyin
2. İlanlar sayfasında filtreleme yapın
3. İlan detaylarını inceleyin
4. Hizmetler ve iletişim sayfalarını ziyaret edin

### Admin Tarafı
1. `/admin` sayfasına gidin
2. Firebase'de oluşturduğunuz admin hesabıyla giriş yapın
3. Yeni ilan ekleyin, mevcut ilanları düzenleyin veya silin
4. Resim yükleyin

## Proje Yapısı

```
src/
├── components/
│   ├── Navbar.jsx              # Navigasyon menüsü
│   ├── PropertyCard.jsx        # İlan kartı
│   ├── PropertyList.jsx        # İlan listesi
│   ├── PropertyDetail.jsx      # İlan detay sayfası
│   ├── FilterBar.jsx           # Filtreleme bileşeni
│   └── admin/
│       ├── AdminLogin.jsx      # Admin giriş sayfası
│       ├── AdminPanel.jsx      # Admin panel
│       └── PropertyForm.jsx    # İlan ekleme/düzenleme formu
├── pages/
│   ├── Home.jsx                # Ana sayfa
│   ├── Properties.jsx          # İlanlar sayfası
│   ├── Services.jsx            # Hizmetler sayfası
│   └── Contact.jsx             # İletişim sayfası
├── config/
│   └── firebase.js             # Firebase yapılandırması
├── App.jsx                     # Ana uygulama
└── main.jsx                    # Giriş noktası
```

## Lisans

Bu proje eğitim amaçlıdır.
