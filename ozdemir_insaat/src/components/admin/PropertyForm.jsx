import { useState } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { uploadToCloudinary } from '../../config/cloudinary';
import './PropertyForm.css';

function PropertyForm({ property, onClose }) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    city: property?.city || '',
    price: property?.price || '',
    rooms: property?.rooms || '',
    area: property?.area || '',
    description: property?.description || ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const uploadImages = async () => {
    const imageUrls = [];
    for (const image of images) {
      const url = await uploadToCloudinary(image);
      imageUrls.push(url);
    }
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = property?.images || [];
      
      if (images.length > 0) {
        imageUrls = await uploadImages();
      }

      const propertyData = {
        ...formData,
        price: Number(formData.price),
        rooms: Number(formData.rooms),
        area: Number(formData.area),
        images: imageUrls,
        updatedAt: new Date()
      };

      if (property) {
        await updateDoc(doc(db, 'properties', property.id), propertyData);
      } else {
        await addDoc(collection(db, 'properties'), {
          ...propertyData,
          createdAt: new Date()
        });
      }

      alert(property ? 'İlan güncellendi!' : 'İlan eklendi!');
      onClose();
    } catch (error) {
      console.error('Kayıt hatası:', error);
      alert('İşlem sırasında hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-form-overlay">
      <div className="property-form">
        <h2>{property ? 'İlan Düzenle' : 'Yeni İlan Ekle'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Başlık"
            value={formData.title}
            onChange={handleChange}
            required
          />
          
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Şehir Seçin</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Antalya">Antalya</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Fiyat (₺)"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="rooms"
            placeholder="Oda Sayısı"
            value={formData.rooms}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="area"
            placeholder="Alan (m²)"
            value={formData.area}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Açıklama"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button type="button" onClick={onClose}>
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyForm;
