import express from 'express';
import db from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    port,
    mongo: db.readyState,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
