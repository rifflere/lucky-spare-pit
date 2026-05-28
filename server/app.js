import express from 'express';
import cors from 'cors';
import inventoryRouter from './routes/inventoryRoutes.js';

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || 'https://lucky-spare-pit.netlify.app';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use('/api', inventoryRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Spare Pit API!');
});

export default app;