const cors = require('cors');
const express = require('express');

const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const aiRoutes = require('./routes/aiRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const githubRoutes = require('./routes/githubRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const profileRoutes = require('./routes/profileRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const projectReviewRoutes = require('./routes/projectReviewRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const skillRoutes = require('./routes/skillRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'MentorLoop API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/github', projectReviewRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
