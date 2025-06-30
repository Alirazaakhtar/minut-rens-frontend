import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline-danger">
      Log ud
    </button>
  );
};

export default LogoutButton;