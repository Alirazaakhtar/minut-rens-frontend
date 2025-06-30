import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="text-center px-3">
        <h1 className="display-5 mb-4">Tusind tak for din henvendelse!</h1>
        <p className="lead mb-4">Vi sætter stor pris på din besked og vender tilbage hurtigst muligt.</p>
        <Link to="/" className="btn btn-success btn-lg w-100">Tilbage til forsiden</Link>
      </div>
    </div>
  );
};

export default ThankYou;