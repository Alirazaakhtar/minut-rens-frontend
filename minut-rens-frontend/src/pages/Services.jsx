import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ServicePage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:8080/services');
        setServices(res.data);
      } catch (err) {
        console.error('Fejl ved hentning af services:', err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vores Services</h2>
      <div className="row">
        {services.map(service => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <p className="card-text fw-bold">{service.price} kr.</p>
                <Link className='btn btn-success' to={"/book"}>Book</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;