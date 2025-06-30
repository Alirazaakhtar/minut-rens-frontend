import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateService = () => {
  const [service, setService] = useState({ name: '', price: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://minut-rens-backend-production.up.railway.app/services', service, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/services/admin');
    } catch (err) {
      console.error(err);
      alert('Kunne ikke oprette service');
    }
  };

  return (
    <div className="container mt-5 px-3" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Opret ny service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Navn</label>
          <input type="text" name="name" value={service.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Pris</label>
          <input type="number" name="price" value={service.price} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-4">
          <label className="form-label">Beskrivelse</label>
          <textarea name="description" rows="5" className='form-control' value={service.description} onChange={handleChange}></textarea>
        </div>
        <button className="btn btn-primary w-100" type="submit">Opret service</button>
      </form>
    </div>
  );
};

export default CreateService;