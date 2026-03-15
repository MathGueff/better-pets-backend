import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const mongodbUri = process.env.MONGODB_URI || '';

mongoose.connect(mongodbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.json({ message: 'Testaí Backend API is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
