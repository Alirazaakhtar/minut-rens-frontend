import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBooking = () => {
  const [services, setServices] = useState([]);
  const [booking, setBooking] = useState({
    service_id: '',
    drop_off_date: '',
    pick_up_date: '',
    status: 'modtaget'
  });
  const [confirmStep, setConfirmStep] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://minut-rens-backend-production.up.railway.app/services')
      .then(res => setServices(res.data))
      .catch(err => console.error('Fejl ved hentning af services:', err));
  }, []);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setConfirmStep(true);
  };

  const handleSubmit = async () => {
    const selectedService = services.find(s => s.id === Number(booking.service_id));
    const total_price = selectedService?.price || 0;

    const bookingData = {
      ...booking,
      total_price
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://minut-rens-backend-production.up.railway.app/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/modtaget');
    } catch (err) {
      console.error(err);
      alert('Fejl ved oprettelse af booking');
    }
  };

  const selectedService = services.find(s => s.id === Number(booking.service_id));
  const total_price = selectedService?.price || 0;

  return (
    <div className="container mt-5 px-3" style={{ maxWidth: '600px' }}>
      {confirmStep ? (
        <div>
          <h2 className="mb-4 text-center">Bekræft din booking</h2>
          <div className="mb-3"><strong>Service:</strong> {selectedService?.name}</div>
          <div className="mb-3"><strong>Afleveringsdato:</strong> {booking.drop_off_date}</div>
          <div className="mb-3"><strong>Afhentningsdato:</strong> {booking.pick_up_date}</div>
          <div className="mb-4"><strong>Total pris:</strong> {total_price} kr.</div>

          <div className="d-grid gap-2">
            <button onClick={handleSubmit} className="btn btn-success">Bekræft booking</button>
            <button onClick={() => setConfirmStep(false)} className="btn btn-secondary">Tilbage</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-4 text-center">Opret booking</h2>
          <form onSubmit={handleConfirm}>
            <div className="mb-3">
              <label className="form-label">Service:</label>
              <select name="service_id" className="form-select" onChange={handleChange} required>
                <option value="">Vælg en service</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name + ' (' + s.price + ' kr)'}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Afleveringsdato:</label>
              <input type="date" name="drop_off_date" className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Afhentningsdato:</label>
              <input type="date" name="pick_up_date" className="form-control" onChange={handleChange} required />
            </div>

            {booking.service_id && (
              <div className="alert alert-info">
                Total pris: {total_price} kr.
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">Gå til bekræftelse</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateBooking;