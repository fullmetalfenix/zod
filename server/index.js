import express from 'express';
import cors from 'cors';
import formRoutes from '../routes/formRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/form', formRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Form endpoint is working' });
});



app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});
