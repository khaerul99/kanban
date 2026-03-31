import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Health Check
app.get('/', (req, res) => res.send('API To-Do List Running 🚀'));

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});