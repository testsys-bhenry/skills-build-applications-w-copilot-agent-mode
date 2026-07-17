import { useEffect, useState } from 'react';
import { fetchEndpoint } from './apiClient';

const USERS_ENDPOINT = '/api/users/';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchEndpoint(USERS_ENDPOINT);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.id ?? user.username}>
                  <td>{user.username ?? 'N/A'}</td>
                  <td>{user.fullName ?? user.name ?? 'N/A'}</td>
                  <td>{user.email ?? 'N/A'}</td>
                  <td>{user.fitnessLevel ?? user.level ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
