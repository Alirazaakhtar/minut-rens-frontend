import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 mb-4">Tusind tak for din henvendelse!</h1>
        <p className="lead mb-4">Vi sætter stor pris på din besked og vender tilbage hurtigst muligt.</p>
        <Link to="/" className="btn btn-success btn-lg">Tilbage til forsiden</Link>
      </div>
    </div>
  );
};

export default ThankYou;