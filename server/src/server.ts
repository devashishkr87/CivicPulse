import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from '@/middleware/errorHandler';

// Routes
import candidateRoutes from '@/routes/candidates';
import constituencyRoutes from '@/routes/constituencies';
import manifestoRoutes from '@/routes/manifesto';
import matchRoutes from '@/routes/match';
import aiRoutes from '@/routes/ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/constituencies', constituencyRoutes);
app.use('/api/v1/manifesto', manifestoRoutes);
app.use('/api/v1/match', matchRoutes);
app.use('/api/v1/ai', aiRoutes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Error handling
app.use(errorHandler);

// Database connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/civicpulse';

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
