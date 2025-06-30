import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://minut-rens-backend-production.up.railway.app/bookings/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Fejl ved hentning af bookinger:', err);
      }
    };
    fetchBookings();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.booking_date.slice(0,10) === today);
  const previousBookings = bookings.filter(b => b.booking_date.slice(0,10) !== today && b.status !== 'afhentet' && b.status !== 'afsluttet');
  const finishedBookings = bookings.filter(b => b.status === 'afhentet' || b.status === 'afsluttet');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://minut-rens-backend-production.up.railway.app/bookings/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        navigate(`/bookings/edit/${searchId}`);
      }
    } catch (err) {
      alert('Booking ikke fundet');
    }
  };

  const renderTable = (title, bookingsList) => (
    <div className="mb-5">
      <h4 className="mb-3">{title}</h4>
      {bookingsList.length === 0 ? (
        <p>Ingen {title.toLowerCase()}.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Booking-ID</th>
                <th>Booking dato</th>
                <th>Status</th>
                <th>Pris</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookingsList.map(b => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{new Date(b.booking_date).toLocaleDateString()}</td>
                  <td>{b.status}</td>
                  <td>{b.total_price} kr.</td>
                  <td><Link className='btn btn-primary btn-sm' to={`/bookings/edit/${b.id}`}>Rediger</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mt-5 px-3">
      <h2 className="mb-4 text-center">Bookinger</h2>
      <form className="mb-4 d-flex" onSubmit={handleSearch}>
        <input
          type="number"
          className="form-control me-2"
          placeholder="Søg booking ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Søg</button>
      </form>

      {renderTable('Dagens bookinger', todayBookings)}
      {renderTable('Tidligere bookinger', previousBookings)}
      {renderTable('Færdige bookinger', finishedBookings)}
    </div>
  );
};

export default AdminPage;