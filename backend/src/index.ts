import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);


app.get('/', (req, res) => res.send('API To-Do List Running 🚀'));

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});