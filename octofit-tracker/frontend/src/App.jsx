import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl } from './components/apiClient';

function App() {
  return (
    <div className="container-fluid px-0 min-vh-100 bg-light">
      <header className="bg-dark text-white py-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h1 className="h3 mb-1">OctoFit Tracker</h1>
            <p className="mb-0 small">React 19 presentation tier</p>
          </div>
          <span className="badge text-bg-info">API: {apiBaseUrl}</span>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <ul className="navbar-nav flex-wrap gap-2 py-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/activities">
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/workouts">
                Workouts
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
