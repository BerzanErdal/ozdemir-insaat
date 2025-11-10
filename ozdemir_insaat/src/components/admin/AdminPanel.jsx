import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import PropertyForm from './PropertyForm';
import './AdminPanel.css';

function AdminPanel() {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const querySnapshot = await getDocs(collection(db, 'properties'));
    const propertiesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProperties(propertiesData);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'properties', id));
        fetchProperties();
      } catch (error) {
        console.error('Silme hatası:', error);
        alert('İlan silinirken hata oluştu');
      }
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProperty(null);
    fetchProperties();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Paneli</h1>
        <div className="admin-actions">
          <button onClick={() => setShowForm(true)} className="add-btn">
            + Yeni İlan Ekle
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Çıkış Yap
          </button>
        </div>
      </div>

      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={handleFormClose}
        />
      )}

      <div className="properties-table">
        <table>
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Şehir</th>
              <th>Fiyat</th>
              <th>Oda</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.city}</td>
                <td>{property.price.toLocaleString('tr-TR')} ₺</td>
                <td>{property.rooms}+1</td>
                <td>
                  <button onClick={() => handleEdit(property)} className="edit-btn">
                    Düzenle
                  </button>
                  <button onClick={() => handleDelete(property.id)} className="delete-btn">
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
