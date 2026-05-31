import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import formRoutes from '../routes/formRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/form', formRoutes);
app.use(express.static(distDir));

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});
