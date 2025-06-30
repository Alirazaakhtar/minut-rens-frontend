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
      const res = await axios.get(`http://localhost:8080/services/${id}`, {
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
    await axios.put(`http://localhost:8080/services/${id}`, service, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate('/services/admin');
  };

  if (!service) return <p>Indlæser...</p>;

  return (
    <div className="container">
      <h2>Rediger Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Navn</label>
          <input className="form-control" value={service.name} onChange={(e) => setService({...service, name: e.target.value})} />
        </div>
        <div className="mb-3">
          <label>Beskrivelse</label>
          <textarea className="form-control" value={service.description} onChange={(e) => setService({...service, description: e.target.value})} />
        </div>
        <div className="mb-3">
          <label>Pris</label>
          <input type="number" className="form-control" value={service.price} onChange={(e) => setService({...service, price: e.target.value})} />
        </div>
        <button type="submit" className="btn btn-success">Gem</button>
      </form>
    </div>
  );
};

export default EditService;