import { useEffect, useState } from 'react';
import { fetchCollection } from './apiClient';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await fetchCollection('teams');
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {items.map((team) => (
            <div className="col-md-6" key={team._id ?? team.id ?? team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name ?? 'Unnamed Team'}</h5>
                  <p className="card-text mb-1">City: {team.city ?? 'N/A'}</p>
                  <p className="card-text mb-1">Coach: {team.coach ?? 'N/A'}</p>
                  <p className="card-text mb-0">
                    Members: {Array.isArray(team.members) ? team.members.length : 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;
