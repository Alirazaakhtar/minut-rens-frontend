import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://minut-rens-backend-production.up.railway.app/auth/register', formData);
      navigate('/oprettet');
    } catch (err) {
      alert(err.response?.data?.error || 'Fejl ved oprettelse');
    }
  };

  return (
    <div className="container mt-5 px-3" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Opret bruger</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Navn:</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="form-label">Kodeord:</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Opret</button>
      </form>
    </div>
  );
};

export default RegisterForm;