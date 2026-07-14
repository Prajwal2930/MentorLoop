const cors = require('cors');
const express = require('express');

const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'MentorLoop API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
