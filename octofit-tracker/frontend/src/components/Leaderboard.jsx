import { useEffect, useState } from 'react';
import { fetchCollection } from './apiClient';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await fetchCollection('leaderboard');
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ol className="list-group list-group-numbered">
          {items.map((entry) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={entry._id ?? entry.id ?? `${entry.rank}-${entry.userId}`}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Rank {entry.rank ?? 'N/A'}</div>
                <span>Period: {entry.period ?? 'N/A'}</span>
              </div>
              <span className="badge text-bg-primary rounded-pill">
                {entry.points ?? 0} pts
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
