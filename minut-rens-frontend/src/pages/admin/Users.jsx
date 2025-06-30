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
        const res = await axios.get('http://localhost:8080/users', {
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
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Alle brugere</h2>

      <input
        type="text"
        placeholder="Søg efter navn eller email..."
        className="form-control mb-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

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
            <td><Link className='btn btn-primary' to={`/users/edit/${user.id}`}>Updater</Link></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
