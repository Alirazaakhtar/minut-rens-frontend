import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://minut-rens-backend-production.up.railway.app/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Fejl ved hentning af bookinger:', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mt-5 px-3">
      <h2 className="mb-4 text-center">Dine bookinger</h2>

      {bookings.length === 0 ? (
        <>
        <div className="alert alert-info text-center">Du har ingen bookinger endnu.</div>
        <div className='text-center'>
        <Link to="/book" className="btn btn-primary btn-lg">Book en service</Link>
        </div>
        </>
      ) : (
        <div className="row row-cols-1 g-4">
          {bookings.map((b) => (
            <div key={b.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <p><strong>Service:</strong> {b.service_name}</p>
                  <p><strong>Afleveringsdato:</strong> {b.drop_off_date.slice(0,10)}</p>
                  <p><strong>Afhentningsdato:</strong> {b.pick_up_date.slice(0,10)}</p>
                  <p><strong>Status:</strong> {b.status}</p>
                  <p><strong>Pris:</strong> {b.total_price} kr.</p>
                  <p><strong>Booket:</strong> {b.booking_date.slice(0,10)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;