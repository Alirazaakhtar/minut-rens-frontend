import { useEffect, useState } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/bookings', {
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
    <div className="container mt-5">
      <h2 className="mb-4">Dine bookinger</h2>

      {bookings.length === 0 ? (
        <div className="alert alert-info">Du har ingen bookinger endnu.</div>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p><strong>Service:</strong> {b.service_name}</p>
              <p><strong>Afleveringsdato:</strong> {b.drop_off_date.slice(0,10)}</p>
              <p><strong>Afhentningsdato:</strong> {b.pick_up_date.slice(0,10)}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <p><strong>Pris:</strong> {b.total_price} kr.</p>
              <p><strong>Booket:</strong> {b.booking_date.slice(0,10)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;