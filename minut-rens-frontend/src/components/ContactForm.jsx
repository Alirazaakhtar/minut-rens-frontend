import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('https://minut-rens-backend-production.up.railway.app/contact', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/tak');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mt-5 px-3" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Kontakt os</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Navn</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="form-label">Besked</label>
          <textarea name="message" className="form-control" rows="5" value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Send besked</button>
      </form>
    </div>
  );
};

export default ContactForm;