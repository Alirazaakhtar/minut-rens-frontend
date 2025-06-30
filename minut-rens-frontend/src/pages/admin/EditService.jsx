import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditService = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://minut-rens-backend-production.up.railway.app/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setService(res.data);
    };
    fetchService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`https://minut-rens-backend-production.up.railway.app/services/${id}`, service, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate('/services/admin');
  };

  if (!service) return <p className="text-center mt-5">Indlæser...</p>;

  return (
    <div className="container mt-5 px-3" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Rediger Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Navn</label>
          <input className="form-control" value={service.name} onChange={(e) => setService({...service, name: e.target.value})} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Beskrivelse</label>
          <textarea className="form-control" value={service.description} onChange={(e) => setService({...service, description: e.target.value})} required />
        </div>
        <div className="mb-4">
          <label className="form-label">Pris</label>
          <input type="number" className="form-control" value={service.price} onChange={(e) => setService({...service, price: e.target.value})} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Gem</button>
      </form>
    </div>
  );
};

export default EditService;