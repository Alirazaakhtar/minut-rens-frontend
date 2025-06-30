import { Link } from 'react-router-dom';

const BookingThankYou = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="text-center px-3">
        <h1 className="display-5 mb-4">Tak for din booking!</h1>
        <p className="lead mb-4">Vi har modtaget din booking og glæder os til at hjælpe dig.</p>
        <p className="mb-4">Ordrebekræftelse er sendt til din mail.</p>
        <Link to="/bookings" className="btn btn-primary btn-lg w-100">Se dine bookinger</Link>
      </div>
    </div>
  );
};

export default BookingThankYou;