import express from 'express';
import { apiBaseUrl } from './config/baseUrl';
import apiRouter from './routes/api';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({
    name: 'octofit-tracker-api',
    port,
    apiBaseUrl,
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
      '/api/health',
    ],
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
