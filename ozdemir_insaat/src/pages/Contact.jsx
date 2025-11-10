import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>İletişim</h1>
        <p>Bizimle iletişime geçin</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>İletişim Bilgileri</h2>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <h3>Adres</h3>
              <p>Örnek Mahallesi, İnşaat Caddesi No:123<br/>İstanbul, Türkiye</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <h3>Telefon</h3>
              <p>+90 (212) 123 45 67</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>info@ozdemirinşaat.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Mesaj Gönderin</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Adınız Soyadınız"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Adresiniz"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefon Numaranız"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Mesajınız"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
            <button type="submit">Gönder</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
