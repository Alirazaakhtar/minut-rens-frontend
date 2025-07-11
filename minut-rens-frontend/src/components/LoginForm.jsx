import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://minut-rens-backend-production.up.railway.app/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      res.data.role === "admin"
        ? navigate('/bookings/admin')
        : navigate('/bookings');
    } catch {
      alert('Login mislykkedes');
    }
  };

  return (
    <div className="container mt-5 px-3" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Log ind</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Indtast din email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Kodeord</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Indtast din adgangskode"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <div className="text-center mt-3">
        <Link to="/register">Opret bruger</Link>
      </div>
    </div>
  );
};

export default LoginForm;