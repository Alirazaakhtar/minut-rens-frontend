import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(res.data);
    };
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/services/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="container">
      <h2>Alle Services</h2>
      <table className="table">
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
                <Link to={`/services/edit/${service.id}`} className="btn btn-primary me-2">Rediger</Link>
                <button onClick={() => handleDelete(service.id)} className="btn btn-danger">Slet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    <Link to={`/services/create`} className="btn btn-primary me-2">Opret en ny service</Link>

    </div>
  );
};

export default AllServices;