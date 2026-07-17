import { useEffect, useState } from 'react';
import { apiOrigin, normalizeApiItems } from './apiClient';

const WORKOUTS_ENDPOINT = `${apiOrigin}/api/workouts/`;

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(WORKOUTS_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeApiItems(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="accordion" id="workoutsAccordion">
          {items.map((workout, index) => {
            const itemId = `workout-${workout._id ?? workout.id ?? index}`;
            return (
              <div className="accordion-item" key={itemId}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${itemId}`}
                  >
                    {workout.title ?? 'Untitled Workout'}
                  </button>
                </h2>
                <div
                  id={itemId}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  data-bs-parent="#workoutsAccordion"
                >
                  <div className="accordion-body">
                    <p className="mb-2">Category: {workout.category ?? 'N/A'}</p>
                    <p className="mb-2">
                      Planned Date:{' '}
                      {workout.plannedDate
                        ? new Date(workout.plannedDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                    <ul className="mb-0">
                      {(workout.exercises ?? []).map((exercise, exerciseIndex) => (
                        <li key={`${itemId}-exercise-${exerciseIndex}`}>
                          {exercise.name ?? 'Exercise'}: {exercise.sets ?? 0}x{exercise.reps ?? 0}
                          {typeof exercise.loadKg === 'number' ? ` @ ${exercise.loadKg}kg` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Workouts;
