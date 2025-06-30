import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ServicePage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://minut-rens-backend-production.up.railway.app/services');
        setServices(res.data);
      } catch (err) {
        console.error('Fejl ved hentning af services:', err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-5 text-center">Vores Services</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {services.map(service => (
          <div key={service.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">{service.name}</h5>
                <p className="card-text flex-grow-1">{service.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fw-bold">{service.price} kr.</span>
                  <Link className='btn btn-primary' to="/book">Book</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;