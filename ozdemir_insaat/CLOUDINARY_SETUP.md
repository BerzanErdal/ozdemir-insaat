# Cloudinary Kurulum Rehberi

## Adım 1: Cloudinary Hesabı Oluşturun

1. https://cloudinary.com/users/register_free adresine gidin
2. Ücretsiz hesap oluşturun (email ile kayıt olun)
3. Email'inizi doğrulayın

## Adım 2: Dashboard Bilgilerini Alın

1. Cloudinary Dashboard'a gidin: https://console.cloudinary.com/
2. Sol üstte **"Cloud Name"** bilginizi göreceksiniz
3. Bu bilgiyi kopyalayın

## Adım 3: Upload Preset Oluşturun

1. Dashboard'da **Settings** (⚙️) ikonuna tıklayın
2. Sol menüden **"Upload"** sekmesine gidin
3. Aşağı kaydırın ve **"Upload presets"** bölümünü bulun
4. **"Add upload preset"** butonuna tıklayın
5. Ayarları yapın:
   - **Preset name:** `ozdemir_insaat`
   - **Signing Mode:** `Unsigned` (önemli!)
   - **Folder:** `properties` (opsiyonel)
6. **"Save"** butonuna tıklayın

## Adım 4: Projeye Ekleyin

`src/config/cloudinary.js` dosyasını açın ve **Cloud Name**'inizi ekleyin:

```javascript
export const CLOUDINARY_CONFIG = {
  cloudName: 'YOUR_CLOUD_NAME', // Buraya Cloud Name'inizi yazın
  uploadPreset: 'ozdemir_insaat'
};
```

**Örnek:**
```javascript
export const CLOUDINARY_CONFIG = {
  cloudName: 'dxyz123abc', // Dashboard'dan aldığınız Cloud Name
  uploadPreset: 'ozdemir_insaat'
};
```

## Adım 5: Test Edin

1. Projeyi çalıştırın: `npm run dev`
2. Admin paneline gidin: `http://localhost:5174/admin`
3. Giriş yapın
4. Yeni ilan ekleyin ve resim yükleyin
5. Resimler Cloudinary'ye yüklenecek!

## Cloudinary Ücretsiz Limitler

✅ 25 GB storage
✅ 25 GB bandwidth/ay
✅ Sınırsız resim transformasyonu
✅ Otomatik optimizasyon

Küçük ve orta ölçekli projeler için tamamen ücretsiz! 🎉

## Sorun Giderme

### "Upload preset not found" hatası
- Upload preset'in adının tam olarak `ozdemir_insaat` olduğundan emin olun
- Signing Mode'un **"Unsigned"** olduğunu kontrol edin

### "Invalid cloud name" hatası
- Cloud Name'i doğru kopyaladığınızdan emin olun
- Tırnak işaretleri içinde olmalı

### Resim yüklenmiyor
- Tarayıcı konsolunu kontrol edin (F12)
- Network sekmesinde Cloudinary API çağrısını inceleyin
