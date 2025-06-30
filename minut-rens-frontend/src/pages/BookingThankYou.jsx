import { Link } from 'react-router-dom';

const BookingThankYou = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 mb-4">Tak for din booking!</h1>
        <p className="lead mb-4">Vi har modtaget din booking og glæder os til at hjælpe dig.</p>
        <Link to="/bookings" className="btn btn-primary btn-lg">Se dine bookinger</Link>
      </div>
    </div>
  );
};

export default BookingThankYou;