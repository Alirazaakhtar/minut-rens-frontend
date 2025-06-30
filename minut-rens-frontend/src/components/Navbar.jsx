import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logout from './Logout';

const Navbar = () => {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">MinutRens</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && role === 'user' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">Services</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/bookings">Dine bookinger</Link>
                </li>
              </>
            )}

            {token && role === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/bookings/admin">Alle bookinger</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Alle brugere</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services/admin">Alle services</Link>
                </li>
              </>
            )}

            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">Services</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/kontakt">Kontakt</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex">
            {!token ? (
              <Link className="btn btn-primary" to="/login">Login</Link>
            ) : (
              <Logout />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;