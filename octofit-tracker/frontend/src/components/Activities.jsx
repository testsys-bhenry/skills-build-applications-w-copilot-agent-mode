import { useEffect, useState } from 'react';
import { apiOrigin, normalizeApiItems } from './apiClient';

const ACTIVITIES_ENDPOINT = `${apiOrigin}/api/activities/`;

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(ACTIVITIES_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeApiItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Completed At</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id ?? activity.id ?? `${activity.type}-${activity.completedAt}`}>
                  <td>{activity.type ?? 'N/A'}</td>
                  <td>{activity.durationMinutes ?? activity.duration ?? 0} min</td>
                  <td>{activity.caloriesBurned ?? activity.calories ?? 0}</td>
                  <td>
                    {activity.completedAt
                      ? new Date(activity.completedAt).toLocaleString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
