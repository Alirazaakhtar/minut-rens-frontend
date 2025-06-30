import { Link } from 'react-router-dom';

const RegistrationSuccess = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="text-center px-3">
        <h1 className="display-5 mb-4">Velkommen ombord!</h1>
        <p className="lead mb-4">Din konto er blevet oprettet succesfuldt. Du kan nu logge ind og komme i gang.</p>
        <Link to="login" className="btn btn-success btn-lg w-100">Gå til login</Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;