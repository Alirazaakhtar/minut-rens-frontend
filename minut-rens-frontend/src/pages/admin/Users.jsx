import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://minut-rens-backend-production.up.railway.app/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Fejl ved hentning af users:', err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
  user.id.toString().includes(search) ||
  user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5 px-3">
      <h2 className="mb-4 text-center">Alle brugere</h2>

      <input
        type="text"
        placeholder="Søg efter id eller email..."
        className="form-control mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Navn</th>
              <th>Email</th>
              <th>Rolle</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td><Link className='btn btn-primary btn-sm' to={`/users/edit/${user.id}`}>Opdater</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;