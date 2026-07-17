import { Router } from 'express';
import db from '../config/database';
import { apiBaseUrl } from '../config/baseUrl';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    port: 8000,
    mongo: db.readyState,
    apiBaseUrl,
  });
});

apiRouter.get('/users/', async (_req, res) => {
  const items = await User.find({}).lean();
  res.json({ count: items.length, items, resource: 'users', apiBaseUrl });
});

apiRouter.get('/teams/', async (_req, res) => {
  const items = await Team.find({}).lean();
  res.json({ count: items.length, items, resource: 'teams', apiBaseUrl });
});

apiRouter.get('/activities/', async (_req, res) => {
  const items = await Activity.find({}).sort({ completedAt: -1 }).lean();
  res.json({ count: items.length, items, resource: 'activities', apiBaseUrl });
});

apiRouter.get('/leaderboard/', async (_req, res) => {
  const items = await Leaderboard.find({}).sort({ rank: 1 }).lean();
  res.json({ count: items.length, items, resource: 'leaderboard', apiBaseUrl });
});

apiRouter.get('/workouts/', async (_req, res) => {
  const items = await Workout.find({}).sort({ plannedDate: 1 }).lean();
  res.json({ count: items.length, items, resource: 'workouts', apiBaseUrl });
});

export default apiRouter;
