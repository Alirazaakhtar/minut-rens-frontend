import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [bookingRes, servicesRes] = await Promise.all([
        axios.get(`http://localhost:8080/bookings/${id}`, { headers }),
        axios.get(`http://localhost:8080/services`, { headers }),
      ]);

      setBooking(bookingRes.data);
      setServices(servicesRes.data);
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {

      // Før du sender til backend
        const formatDate = (dateStr) => dateStr?.substring(0, 10);

        const bookingData = {
           ...booking,
          drop_off_date: formatDate(booking.drop_off_date),
          pick_up_date: formatDate(booking.pick_up_date),
        };

      await axios.put(`http://localhost:8080/bookings/${id}`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/bookings/admin');
    } catch (err) {
      console.error(err);
      alert('Fejl ved opdatering');
    }
  };

  if (!booking) {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Indlæser...</span>
      </div>
    </div>
  );
}
  return (
    <div className="container">
      <h2>Rediger booking #{id}</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label><b>Bruger-ID:</b> {booking.user_id}</label>
        </div>

        <div className="mb-3">
          <label>Service</label>
          <select
            name="service_id"
            value={booking.service_id}
            onChange={handleChange}
            className="form-control"
          >
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Afleveringsdato</label>
          <input
            type="date"
            name="drop_off_date"
            value={booking.drop_off_date?.substring(0, 10)}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Afhentningsdato</label>
          <input
            type="date"
            name="pick_up_date"
            value={booking.pick_up_date?.substring(0, 10)}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Status</label>
          <select
            name="status"
            value={booking.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="modtaget">Modtaget</option>
            <option value="i gang">I gang</option>
            <option value="klar til afhentning">Klar til afhentning</option>
            <option value="afhentet">Afhentet</option>
            <option value="annulleret">Annulleret</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Pris</label>
          <input
            type="number"
            name="total_price"
            value={booking.total_price}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Gem ændringer</button>
      </form>
    </div>
  );
};

export default EditBooking;