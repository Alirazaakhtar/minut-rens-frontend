import { Link } from 'react-router-dom';

const RegistrationSuccess = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-5 shadow rounded-4 text-center">
        <h2 className="mb-4">Velkommen ombord!</h2>
        <p className="mb-4">Din konto er blevet oprettet succesfuldt. Du kan nu logge ind og komme i gang.</p>
        <Link to="/login" className="btn btn-primary px-4 py-2">Gå til login</Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;