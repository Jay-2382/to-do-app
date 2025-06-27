// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import authRoutes from './routes/authRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';
// import connectDB from './config/db.js';

// dotenv.config();
// connectDB(); // Connect to MongoDB

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // For JSON request bodies

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// // Base route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// ✅ Updated CORS Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json()); // For JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
