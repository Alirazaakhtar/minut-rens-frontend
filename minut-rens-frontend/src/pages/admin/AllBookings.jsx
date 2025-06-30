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
        const res = await axios.get('http://localhost:8080/bookings/admin', {
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
      const res = await axios.get(`http://localhost:8080/bookings/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        navigate(`/bookings/edit/${searchId}`);
      }
    } catch (err) {
      alert('Booking ikke fundet');
    }
  };

  return (
    <div className="container">
      <h2>Bookinger</h2>
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

      <h4>Dagens bookinger</h4>
      {todayBookings.length === 0 ? (
        <p>Ingen bookinger for i dag.</p>
      ) : (
        <table className="table table-striped mb-5">
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
            {todayBookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{new Date(b.booking_date).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>{b.total_price} kr.</td>
                <td><Link className='btn btn-primary' to={`/bookings/edit/${b.id}`}>Rediger</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4>Tidligere bookinger</h4>
      {previousBookings.length === 0 ? (
        <p>Ingen tidligere bookinger.</p>
      ) : (
        <table className="table table-striped mb-5">
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
            {previousBookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{new Date(b.booking_date).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>{b.total_price} kr.</td>
                <td><Link className='btn btn-primary' to={`/bookings/edit/${b.id}`}>Rediger</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4>Færdige bookinger</h4>
      {finishedBookings.length === 0 ? (
        <p>Ingen færdige bookinger.</p>
      ) : (
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
            {finishedBookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{new Date(b.booking_date).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>{b.total_price} kr.</td>
                <td><Link className='btn btn-primary' to={`/bookings/edit/${b.id}`}>Rediger</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;