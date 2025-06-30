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
    console.log(service);
    
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

        await axios.post('http://localhost:8080/services', service, {
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
    <div className="container">
      <h2>Opret ny service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Navn</label>
          <input type="text" name="name" value={service.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Pris</label>
          <input type="number" name="price" value={service.price} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Beskrivelse</label>
          <textarea type="text" name="description" rows="5" cols="40" className='form-control' value={service.description} onChange={handleChange}></textarea>
        </div>
        <button className="btn btn-primary" type="submit">Opret service</button>
      </form>
    </div>
  );
};

export default CreateService;