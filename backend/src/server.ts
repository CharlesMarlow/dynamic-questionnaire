import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
