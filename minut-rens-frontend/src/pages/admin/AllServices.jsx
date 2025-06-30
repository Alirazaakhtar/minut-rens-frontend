import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://minut-rens-backend-production.up.railway.app/services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    };
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`https://minut-rens-backend-production.up.railway.app/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="container mt-5 px-3">
      <h2 className="mb-4 text-center">Alle Services</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Navn</th>
              <th>Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>
                  <Link to={`/services/edit/${service.id}`} className="btn btn-primary btn-sm me-2">Rediger</Link>
                  <button onClick={() => handleDelete(service.id)} className="btn btn-danger btn-sm">Slet</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-grid gap-2 mt-4">
        <Link to={`/services/create`} className="btn btn-success w-100">Opret en ny service</Link>
      </div>
    </div>
  );
};

export default AllServices;